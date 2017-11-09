import React from 'react'
import { Router, Route, Switch } from 'react-static'

import Home from 'containers/Home'
import Team from 'containers/Team'
import Apply from 'containers/Apply'
import ApplyRepl from 'containers/ApplyRepl'
import StartRepl from 'containers/StartRepl'
import NotFound from 'containers/NotFound'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/team" component={Team} />
      <Route path="/apply/replit" component={ApplyRepl} />
      <Route path="/apply" component={Apply} />
      <Route path="/start/replit/:userId" component={StartRepl} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
