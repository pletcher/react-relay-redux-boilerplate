import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logOut } from 'actions/logOut'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

class Header extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  }

  render() {
    return (
      <nav className="clearfix">
        <div className="col">
          <Link to="/" className="black bold inline-block p2">Home</Link>
        </div>
        {this.renderRegistrationButtons()}
      </nav>
    )
  }

  renderRegistrationButtons() {
    const { viewer: { username } } = this.props

    if (username) {
      return (
        <div className="sm-col-right">
          <Link to={`/users/${username}`} className="black bold inline-block p2">@{username}</Link>
          <a href="#" className="black bold inline-block p2" onClick={logOut}>Log out</a>
        </div>
      )
    }

    return (
      <div className="sm-col-right">
        <Link to="/signup" className="black bold inline-block p2">Sign up</Link>
        <Link to="/login" className="black bold inline-block p2">Log in</Link>
      </div>
    )
  }
}

const HeaderContainer = Relay.createContainer(Header, {
  fragments: {
    viewer: () => Relay.QL`fragment Header on User {
      username,
    }`
  }
})

export default connect()(HeaderContainer)
