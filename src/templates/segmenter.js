import React, { Component } from 'react'
import { navigate } from 'gatsby'
import Index from 'pages/index'
import storage from 'storage'

class Segmenter extends Component {
  componentDidMount() {
    const userType = this.props.pageContext.userType
    storage.set('userType', userType)
    window.analytics.identify({ userType })
    navigate('/')
  }
  render() {
    return <Index />
  }
}

export default Segmenter
