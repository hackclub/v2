import React, { Component, Fragment } from 'react'
import { Box, Text } from '@hackclub/design-system'
import Post from 'components/challenge/Post'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import api from 'api'
import { includes, isEmpty, get, orderBy } from 'lodash'

class Posts extends Component {
  state = { posts: [], upvotes: [], status: 'loading', prevUserId: null }

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
    this.refreshPosts(this.props.userId)
    this.refreshIntervalId = setInterval(() => {
      this.refreshPosts(this.props.userId, true)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshIntervalId)
  }

  refreshPosts(newUserId, intervalUpdate = false) {
    const { challengeId, userId: oldUserId } = this.props

    // super hacky, but right now there's a dumb issue where userId is not
    // properly passed & it's set to undefined when we actually have its value
    // stored in localStorage.
    //
    // the real solution is to do proper state management so we don't have to do
    // a full http request to get the current user's info & we can retrieve
    // cached values with confidence, but for the time being i'm going to fall
    // back to the last remembered userId in localStorage. i think this is set
    // by the login component, but not 100% sure.
    const userId = newUserId || oldUserId || localStorage.getItem('userId')

    console.log('refreshing!')

    api
      .get(`v1/challenges/${challengeId}/posts`)
      .then(data => {
        let posts = data || []

        // array of post ids that user has upvoted
        const upvotes = []
        posts.forEach(post => {
          post.upvotesCount = post.upvotes.length
          post.upvotes.forEach(upvote => {
            if (upvote.user.id == userId) {
              upvotes.push(post.id)
            }
          })
        })

        // sort by upvote count
        posts = posts.sort((p1, p2) => {
          return p2.upvotesCount - p1.upvotesCount
        })

        // TODO (later): remove upvotes array for better performace
        this.setState({ upvotes, posts, status: 'success' })
      })
      .catch(err => {
        // A user shouldn't see an update if they lose connection for 3 seconds
        // They'll only see an error for a user-triggered action
        if (!intervalUpdate) {
          this.setState({ status: 'error' })
        }
      })
  }

  onUpvote(e, postId) {
    const { userId: authUser } = this.props
    if (authUser === undefined) return
    let { upvotes, posts } = this.state
    let post = posts.find(post => post.id == postId)
    let postIndex = posts.indexOf(post)
    if (includes(upvotes, postId)) {
      // if this is nil, this means we've ran into a race where this.state.posts
      // hasn't finished updating (probably from a this.refreshPosts call) -
      // just ignore the user action for the time being and let them retry once
      // it actually updates
      const upvote = posts
        .find(post => post.id == postId)
        .upvotes.find(upvote => upvote.user.id == authUser)

      if (!upvote) return

      // immediately increment values so it feels responsive, later refresh
      // posts completely so we have the correct values in state
      // remove post from upvotes array w/ removed postId
      let truncatedUpvotes = upvotes.filter(upvote => upvote !== postId)
      this.setState({ upvotes: truncatedUpvotes })

      // decrement upvotesCount //
      post.upvotesCount--
      posts[postIndex] = post
      this.setState({ posts })

      // actually make requests & refresh
      api.delete(`v1/upvotes/${upvote.id}`).then(() => this.refreshPosts())
    } else {
      // add post to upvotes array //
      upvotes.push(postId)
      this.setState({ upvotes })

      // increment upvotesCount //
      post.upvotesCount++
      posts[postIndex] = post
      this.setState({ posts })

      // actually make requests & refresh
      api.post(`v1/posts/${postId}/upvotes`).then(() => this.refreshPosts())
    }
  }

  render() {
    const { posts, upvotes, status } = this.state
    const { userId } = this.props
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'success':
        return (
          <Fragment>
            {isEmpty(posts) && (
              <Text f={3} color="muted" py={4} align="center">
                No submissions yet!
              </Text>
            )}
            {orderBy(posts, 'rank_score', 'desc').map(post => (
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
                disabled={userId === undefined}
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
