import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Button from 'components/ui/Button'
import * as EditUserActions from 'actions/editUser'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import UpdateUserMutation from 'mutations/UpdateUserMutation'

class UsersEdit extends Component {
  static propTypes = {
    changeEmailAddress: PropTypes.func.isRequired,
    changeFirstName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    user: PropTypes.shape({
      emailAddress: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
    viewer: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.handleEmailAddressChange = ::this.handleEmailAddressChange
    this.handleFirstNameChange = ::this.handleFirstNameChange
    this.handleLastNameChange = ::this.handleLastNameChange
    this.handleSave = ::this.handleSave
  }

  componentDidMount() {
    const {
      user: {
        emailAddress,
        firstName,
        lastName,
      },
      changeEmailAddress,
      changeFirstName,
      changeLastName,
    } = this.props

    changeEmailAddress(emailAddress)
    changeFirstName(firstName)
    changeLastName(lastName)
  }

  handleEmailAddressChange(e) {
    e.preventDefault()

    this.props.changeEmailAddress(e.target.value)
  }

  handleFirstNameChange(e) {
    e.preventDefault()

    this.props.changeFirstName(e.target.value)
  }

  handleLastNameChange(e) {
    e.preventDefault()

    this.props.changeLastName(e.target.value)
  }

  handleSave(e) {
    e.preventDefault()

    const {
      emailAddress,
      firstName,
      lastName,
      user,
    } = this.props

    if (emailAddress) {
      this.props.submitForm({ emailAddress, firstName, lastName, user }, () => {
        this.context.router.push(`/users/${user.username}`)
      })
    }
  }

  render() {
    const {
      emailAddress,
      firstName,
      lastName,
      username,
    } = this.props

    return (
      <div className="mx-auto sm-col-6">
        <h2>@{username}</h2>
        <form>
          <div className="mt2">
            <label>Email</label>
            <input type="email"
              className="block col-12 field"
              onChange={this.handleEmailAddressChange}
              onKeyDown={this.handleKeyDown}
              value={emailAddress} />
          </div>

          <div className="mt2">
            <label>First name</label>
            <input type="text"
              className="block col-12 field"
              onChange={this.handleFirstNameChange}
              onKeyDown={this.handleKeyDown}
              value={firstName} />
          </div>

          <div className="mt2">
            <label>Last name</label>
            <input type="text"
              className="block col-12 field"
              onChange={this.handleLastNameChange}
              onKeyDown={this.handleKeyDown}
              value={lastName} />
          </div>

          <div className="mt3 mb2">
            {this.renderSaveButton()}
          </div>
          <div className="mt3 mb2">
            {this.renderCancelButton()}
          </div>
        </form>
      </div>
    )
  }

  renderCancelButton() {
    const {
      user: {
        username,
      },
    } = this.props

    return <Link to={`/users/${username}`} className="block btn btn-default center">Cancel</Link>
  }

  renderSaveButton() {
    return <Button block={true} onClick={this.handleSave} type="primary">Save</Button>
  }
}

function selectState(state) {
  return {
    emailAddress: state.editUser.emailAddress,
    firstName: state.editUser.firstName,
    lastName: state.editUser.lastName,
  }
}

function bindDispatch(dispatch) {
  return bindActionCreators(EditUserActions, dispatch)
}

const connectedComponent = connect(selectState, bindDispatch)(UsersEdit)

export default Relay.createContainer(connectedComponent, {
  fragments: {
    user: () => Relay.QL`fragment Show on User {
      emailAddress,
      firstName,
      lastName,
      username,
      ${UpdateUserMutation.getFragment('user')}
    }`,
    viewer: () => Relay.QL`fragment ShowUser on User {
      id,
    }`,
  }
})
