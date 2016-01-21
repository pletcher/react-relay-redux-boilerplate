import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

class UsersShow extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      emailAddress: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
    viewer: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }
  render() {
    const {
      user: {
        emailAddress,
        firstName,
        lastName,
        username,
      },
    } = this.props

    return (
      <div className="sm-col-6 fit mx-auto p4">
        <h2>@{username}</h2>
        <p>{emailAddress}</p>
        {firstName && <p>{firstName} {lastName}</p>}
        {this.renderEditButton()}
      </div>
    )
  }

  renderEditButton() {
    const {
      user: {
        id: userId,
        username,
      },
      viewer: {
        id: viewerId,
      },
    } = this.props

    if (userId === viewerId) {
      return <Link to={`/users/${username}/edit`}>Edit</Link>
    }
  }
}

export default Relay.createContainer(UsersShow, {
  fragments: {
    user: () => Relay.QL`fragment Show on User {
      emailAddress,
      id,
      firstName,
      lastName,
      username,
    }`,
    viewer: () => Relay.QL`fragment ShowUser on User {
      id,
    }`,
  }
})
