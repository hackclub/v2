import React, { Component, Fragment } from 'react'
import { Box, Text } from '@hackclub/design-system'
import Post from 'components/challenge/Post'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import api from 'api'
import { includes, isEmpty, get, orderBy } from 'lodash'

const sortFunctions = {
  trending: posts => orderBy(posts, 'rank_score', 'desc'),
  newest: posts => orderBy(posts, 'created_at', 'desc'),
  top: posts => orderBy(posts, 'upvotesCount', 'desc')
}

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
    const userId = newUserId || oldUserId

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
    const { userId, sortBy } = this.props
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
            {sortFunctions[sortBy](posts).map((post, index) => (
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
                index={index + 1}
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
