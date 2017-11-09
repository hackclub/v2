import React from 'react'
import { Router, Route, Switch } from 'react-static'

import Home from 'containers/Home'
import Team from 'containers/Team'
import Apply from 'containers/Apply'
import ApplyRepl from 'containers/ApplyRepl'
import Repl from 'containers/Repl'
import NotFound from 'containers/NotFound'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/team" component={Team} />
      <Route path="/apply/replit" component={ApplyRepl} />
      <Route path="/apply" component={Apply} />
      <Route path="/signup/replit/:userId" component={Repl} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
