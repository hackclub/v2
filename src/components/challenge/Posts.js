import React, { Component, Fragment } from 'react'
import api from 'api'
import Post from 'components/challenge/Post'
import storage from 'storage'
import { includes, isEmpty } from 'lodash'

class Posts extends Component {
  constructor() {
    super()
    this.state = { posts: [], upvotes: [], userId: null }
  }

  componentWillMount() {
    api.get(`v1/challenges/${this.props.challengeId}`).then(posts => {
      // TODO: add upvotesCount property to each
      // TODO: collect IDs of user's (get from storage.get('userId'))
      //       upvoted posts + setState({ upvotes })
      // TODO: remove upvotes array for better performace
      this.setState({ posts })
    })
  }

  onUpvote(e, id) {
    const { userId: authUser } = this.state
    if (isEmpty(authUser)) return
    if (includes(this.state.upvotes, id)) {
      api.delete(`v1/posts/${id}/upvotes`, { authUser })
    } else {
      api.post(`v1/posts/${id}/upvotes`, { authUser })
    }
    // TODO: add/remove ID from upvotes array in state
    // TODO: increment/decrement state's post data upvotesCount
  }

  render() {
    const { posts, upvotes } = this.state
    return (
      <Fragment>
        {posts.map(post => (
          <Post
            name={post.name}
            url={post.url}
            description={post.description}
            upvotes={post.upvotes.length}
            upvoted={includes(upvotes, post.id)}
          />
        ))}
      </Fragment>
    )
  }
}

export default Posts
