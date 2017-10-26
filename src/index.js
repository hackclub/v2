import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
export default App

// Render your app
if (typeof document !== 'undefined') {
  const render = Comp => {
    ReactDOM.hydrate(
      <AppContainer>
        <Comp />
      </AppContainer>,
      document.getElementById('root')
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('./App', () => {
      render(require('./App').default)
    })
  }
}
