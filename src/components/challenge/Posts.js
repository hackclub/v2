import React, { Component, Fragment } from 'react'
import api from 'api'
import Post from 'components/challenge/Post'
import { includes } from 'lodash'

class Posts extends Component {
  constructor() {
    super()
    this.state = { posts: [], upvotes: [] }
  }

  componentWillMount() {
    api
      .get(`/v1/challenges/${this.props.challengeId}`)
      .then(posts => this.setState({ posts }))
      .then(posts => 'FIND_MY_UPVOTES')
  }

  onUpvote(e, id) {
    const { authUser } = this.props
    if (includes(this.state.upvotes, id)) {
      api.delete(`/v1/posts/${id}/upvotes`, { authUser })
    } else {
      api.post(`/v1/posts/${id}/upvotes`, { authUser })
    }
  }

  render() {
    const { posts } = this.state
    return (
      <Fragment>
        {posts.map(post => (
          <Post
            name={post.name}
            url={post.url}
            description={post.description}
            upvotes={post.upvotes.length}
          />
        ))}
      </Fragment>
    )
  }
}

export default Posts
