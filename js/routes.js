import { IndexRoute, Route } from 'react-router'
import App from 'components/App'
import AuthenticationPage from 'components/pages/AuthenticationPage'
import DefaultPage from 'components/pages/DefaultPage'
import LandingPage from 'components/pages/LandingPage'
import LoginForm from 'components/authentication/LoginForm'
import React from 'react'
import SignupForm from 'components/authentication/SignupForm'
import UsersEdit from 'components/users/UsersEdit'
import UsersQueries from 'queries/UsersQueries'
import UsersShow from 'components/users/UsersShow'
import ViewerQueries from 'queries/ViewerQueries'

export default (
  <Route path="/" component={App} queries={ViewerQueries}>
    <IndexRoute component={LandingPage} />
    <Route component={DefaultPage}>
      <Route component={AuthenticationPage}>
        <Route path="login" component={LoginForm} />
        <Route path="signup" component={SignupForm} />
      </Route>
      <Route path="users/:username" component={UsersShow} queries={UsersQueries} />
      <Route path="users/:username/edit" component={UsersEdit} queries={UsersQueries} />
    </Route>
  </Route>
)
