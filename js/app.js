import 'babel-polyfill'
import '../css/app.css'

import { browserHistory } from 'react-router'
import { configureStore } from 'store'
import { Provider } from 'react-redux'
import { RelayRouter } from 'react-router-relay'
import cookies from 'lib/cookies'
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import routes from 'routes'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    headers: {
      Authorization: `Bearer ${cookies.get('jwt')}`
    }
  })
)

const store = configureStore(window.__INITIAL_STATE__)

ReactDOM.render(
  <Provider store={store}>
    <RelayRouter history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
