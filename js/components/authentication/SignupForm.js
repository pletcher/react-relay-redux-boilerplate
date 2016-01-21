import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ENTER_KEY } from 'constants'
import * as SignupFormActions from 'actions/signupForm'
import Button from 'components/ui/Button'
import React, { Component, PropTypes } from 'react'

class SignupForm extends Component {
  static propTypes = {
    changeEmailAddress: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    changeUsername: PropTypes.func.isRequired,
    emailAddress: PropTypes.string,
    isSubmitting: PropTypes.bool,
    password: PropTypes.string,
    submitForm: PropTypes.func.isRequired,
    username: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.handleEmailAddressChange = ::this.handleEmailAddressChange
    this.handleKeyDown = ::this.handleKeyDown
    this.handlePasswordChange = ::this.handlePasswordChange
    this.handleSubmit = ::this.handleSubmit
    this.handleUsernameChange = ::this.handleUsernameChange
  }

  handleEmailAddressChange(e) {
    e.preventDefault()

    this.props.changeEmailAddress(e.target.value)
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.handleSubmit(e)
    }
  }

  handlePasswordChange(e) {
    e.preventDefault()

    this.props.changePassword(e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault()

    const { emailAddress, password, username } = this.props

    if (emailAddress && password && username) {
      this.props.submitForm({ emailAddress, password, username })
    }
  }

  handleUsernameChange(e) {
    e.preventDefault()

    this.props.changeUsername(e.target.value)
  }

  render() {
    const {
      emailAddress,
      password,
      username,
    } = this.props

    return (
      <form>
        <div className="mt2">
          <label>Username</label>
          <input type="text"
            className="block col-12 field"
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyDown}
            value={username} />
        </div>

        <div className="mt2">
          <label>Email</label>
          <input type="email"
            className="block col-12 field"
            onChange={this.handleEmailAddressChange}
            onKeyDown={this.handleKeyDown}
            value={emailAddress} />
        </div>

        <div className="mt2">
          <label>Password</label>
          <input type="password"
            className="block col-12 field"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyDown}
            value={password} />
        </div>

        <div className="mt3 mb2">
          <Button block={true} onClick={this.handleSubmit} type="primary">
            <span className="center">Sign up</span>
          </Button>
        </div>
      </form>
    )
  }
}

function selectState(state) {
  return {
    emailAddress: state.signupForm.emailAddress,
    password: state.signupForm.password,
    username: state.signupForm.username,
  }
}

function bindDispatch(dispatch) {
  return bindActionCreators(SignupFormActions, dispatch)
}

export default connect(selectState, bindDispatch)(SignupForm)
