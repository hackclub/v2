import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Post from 'components/challenge/Post'
import storage from 'storage'
import { map, includes, isEmpty, filter } from 'lodash'

class Posts extends Component {
  constructor() {
    super()
    this.state = { posts: [], upvotes: [], userId: null, userEmail: null }
  }

  componentDidMount() {
    const userId = storage.get('userId')
    const userEmail = storage.get('userEmail')
    this.setState({ userId, userEmail })
    this.api = axios.create({
      baseURL: 'https://api.hackclub.com/',
      timeout: 1000,
      headers: { authUser: userId }
    })
    this.api.get(`v1/challenges/${this.props.challengeId}/posts`).then(res => {
      const posts = res.data || []
      const upvotes = map(
        filter(
          posts,
          post => filter(post.upvotes, vote => ['user.email', userEmail]),
          'id'
        )
      )
      console.log(upvotes)
      posts.map(post => {
        post.upvotesCount = post.upvotes.length
        return post
      })
      // TODO: remove upvotes array for better performace
      this.setState({ upvotes, posts })
    })
  }

  onUpvote(e, id) {
    const { userId: authUser } = this.state
    if (isEmpty(authUser)) return
    if (includes(this.state.upvotes, id)) {
      api
        .delete(`v1/posts/${id}/upvotes`, { headers: { authUser } })
        .then(res => {
          const post = this.setState({})
        })
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
            onUpvote={e => this.onUpvote(e, post.id)}
          />
        ))}
      </Fragment>
    )
  }
}

export default Posts
