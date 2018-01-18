import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import {createMemoryHistory, createBrowserHistory} from 'history'

let history
if (typeof(window) !== 'undefined') {
  history = createBrowserHistory()
} else {
  history = createMemoryHistory()
}

history.listen((location, action) => {
  window.analytics.page(location.pathname)
})

export default () => (
  <Router history={history}>
    <Routes />
  </Router>
)
