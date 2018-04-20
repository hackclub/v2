import React, { Component, Fragment } from 'react'
import { Text } from '@hackclub/design-system'
import Post from 'components/challenge/Post'
import LoadingAnimation from 'components/LoadingAnimation'
import ErrorPage from 'components/admin/ErrorPage'
import api from 'api'
import { includes, isEmpty, get } from 'lodash'

class Posts extends Component {
  state = { posts: [], upvotes: [], status: 'loading', prevUserId: null }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps
    const { prevUserId } = this.state

    if (userId === prevUserId) return

    this.refreshPosts(userId)

    this.setState({
      prevUserId: userId
    })
  }

  refreshPosts(newUserId) {
    const { challengeId, userId: oldUserId } = this.props
    const userId = newUserId || oldUserId
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
        this.setState({ status: 'error' })
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
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            {isEmpty(posts) && (
              <Text f={3} color="muted" py={4} align="center">
                No submissions yet!
              </Text>
            )}
            {posts.map(post => {
              const mine = get(post, 'creator.id') === userId
              return (
                <Post
                  name={post.name}
                  url={post.url_redirect}
                  description={post.description}
                  createdAt={post.created_at}
                  mine={mine}
                  upvotes={post.upvotesCount}
                  upvoted={includes(upvotes, post.id)}
                  onUpvote={e => this.onUpvote(e, post.id)}
                  disabled={userId === undefined}
                  key={post.url}
                />
              )
            })}
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Posts
