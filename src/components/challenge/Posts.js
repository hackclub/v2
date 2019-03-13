import React, { Component, Fragment } from 'react'
import { Text } from '@hackclub/design-system'
import Post from 'components/challenge/Post'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/ErrorPage'
import api from 'api'
import { includes, isEmpty, get, orderBy } from 'lodash'

function SeededRandom(seed) {
  this.seed = seed
  this.get = () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
}

class Posts extends Component {
  state = {
    posts: [],
    upvotes: [],
    status: 'loading',
    requestIds: [],
    prevUserId: null
  }

  sortFunctions = {
    trending: posts => orderBy(posts, 'rank_score', 'desc'),
    newest: posts => orderBy(posts, 'created_at', 'desc'),
    top: posts => orderBy(posts, 'upvotesCount', 'desc'),
    viewed: posts => orderBy(posts, 'click_count', 'desc'),
    random: posts => {
      const randGenerator = new SeededRandom(this.seed)
      return posts
        .sort((a, b) => a.id - b.id)
        .sort((a, b) => randGenerator.get() - 0.5)
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { userId } = nextProps
    const { prevUserId } = prevState

    if (userId === prevUserId) {
      return {}
    } else {
      return { prevUserId: userId }
    }
  }

  componentDidMount() {
    this.seed = Math.random()
    this.refreshPosts(this.props.userId)
    this.refreshIntervalId = setInterval(() => {
      this.refreshPosts(this.props.userId, true)
    }, 4096)
  }

  componentWillUnmount() {
    clearInterval(this.refreshIntervalId)
  }

  processPosts(posts) {
    const userId = this.props.userId
    // array of post ids that user has upvoted
    const upvotes = []
    const submitterIds = posts.map(post => post.creator.id)
    posts.forEach(post => {
      let sum = 0
      post.upvotes.forEach(upvote => {
        if (upvote.user.id === userId) {
          upvotes.push(post.id)
        }
        if (submitterIds.indexOf(upvote.user.id) === -1) {
          // votes by non-submitters count as 1
          sum++
        } else if (upvote.user.id === post.creator.id) {
          // votes by subitters to their own work count as 1
          sum++
        } else {
          // by creators to other people's projects count as 10
          sum += 10
        }
      })
      post.upvotesCount = sum
    })

    this.setState({ upvotes, posts, submitterIds })
  }

  refreshPosts(intervalUpdate = false) {
    const { challengeId, userId } = this.props
    const requestId = Math.random().toString()

    this.setState(state => ({
      requestIds: state.requestIds.concat(requestId)
    }))

    api
      .get(
        `v1/challenges/${challengeId}/posts`,
        {},
        { noAuth: userId === undefined }
      )
      .then(data => {
        if (intervalUpdate && this.state.requestIds.length > 0) {
          return
        }
        let posts = data || []
        this.processPosts(posts)

        this.setState({ status: 'success' })
      })
      .catch(err => {
        // A user shouldn't see an update if they lose connection for 3 seconds
        // They'll only see an error for a user-triggered action
        if (!intervalUpdate) {
          this.setState({ status: 'error' })
        }
      })
      .finally(() => {
        const index = this.state.requestIds.indexOf(requestId)
        if (index !== -1) {
          const newRequestIds = this.state.requestIds.splice(1, index)
          this.setState({
            requestIds: newRequestIds
          })
        }
      })
  }

  onUpvote(e, postId) {
    const { userId: authUser } = this.props
    // Ignore the click if we're not authed
    if (authUser === undefined) return
    // You can only vote if you submitted a project
    let { upvotes, posts } = this.state
    let post = posts.find(post => post.id === postId)
    // You can't click on posts that are still loading
    if (post.loading) {
      return
    }
    if (includes(upvotes, postId)) {
      // if this is nil, this means we've ran into a race where this.state.posts
      // hasn't finished updating (probably from a this.refreshPosts call) -
      // just ignore the user action for the time being and let them retry once
      // it actually updates
      const upvote = posts
        .find(post => post.id === postId)
        .upvotes.find(upvote => upvote.user.id === authUser)

      if (!upvote) return

      // immediately increment values so it feels responsive, later refresh
      // posts completely so we have the correct values in state
      // remove post from upvotes array w/ removed postId
      // let truncatedUpvotes = upvotes.filter(upvote => upvote !== postId)
      // this.setState({ upvotes: truncatedUpvotes })
      //
      // // decrement upvotesCount //
      // post.upvotesCount--
      // posts[postIndex] = post
      // this.setState({ posts })
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const modifiedUpvotes = post.upvotes.filter(
            upvote => upvote.user.id !== authUser
          )
          return { ...post, loading: true, upvotes: modifiedUpvotes }
        } else {
          return post
        }
      })
      this.processPosts(updatedPosts)

      // actually make requests & refresh
      api.delete(`v1/upvotes/${upvote.id}`).then(() => this.refreshPosts())
    } else {
      // add post to upvotes array //
      // upvotes.push(postId)
      // this.setState({ upvotes })
      //
      // // increment upvotesCount //
      // post.upvotesCount++
      // posts[postIndex] = post
      // this.setState({ posts })
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const newUpvote = {
            // Generate a random ID for the upvote so we can refer to it in future presses -- it will be overwritten when the page updates with an ID from the backend
            id: Math.round(Math.random() * -10000),
            user: { id: authUser }
          }
          const modifiedUpvotes = [...post.upvotes, newUpvote]
          return { ...post, loading: true, upvotes: modifiedUpvotes }
        } else {
          return post
        }
      })
      this.processPosts(updatedPosts)

      // actually make requests & refresh
      api.post(`v1/posts/${postId}/upvotes`).then(() => this.refreshPosts())
    }
  }

  render() {
    const { posts, upvotes, status } = this.state
    const { userId, sortBy } = this.props
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'success':
        return (
          <Fragment>
            {isEmpty(posts) && (
              <Text fontSize={3} color="muted" py={4} align="center" bold>
                No submissions yet!
              </Text>
            )}
            {this.sortFunctions[sortBy](posts).map((post, index) => (
              <Post
                id={post.id}
                name={post.name}
                url={post.url_redirect}
                description={post.description}
                createdAt={post.created_at}
                mine={get(post, 'creator.id') === userId}
                commentsCount={post.comment_count}
                upvotesCount={post.upvotesCount}
                upvoted={includes(upvotes, post.id)}
                onUpvote={e => this.onUpvote(e, post.id)}
                clickCount={post.click_count}
                disabled={userId === undefined}
                loading={post.loading}
                index={index + 1}
                shirt={this.props.shirt}
                key={post.id}
              />
            ))}
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Posts
