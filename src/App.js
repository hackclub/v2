import React from 'react'
import { Router, Route, Switch } from 'react-static'

import Home from 'containers/Home'
import Team from 'containers/Team'
import Repl from 'containers/Repl'
import NotFound from 'containers/404'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/team" component={Team} />
      <Route path="/signup/replit/:userId" component={Repl} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
