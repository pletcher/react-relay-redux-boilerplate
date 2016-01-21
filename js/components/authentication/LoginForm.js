import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ENTER_KEY } from 'constants'
import * as LoginFormActions from 'actions/loginForm'
import Button from 'components/ui/Button'
import React, { Component, PropTypes } from 'react'

class LoginForm extends Component {
  static propTypes = {
    changeEmailAddressOrUsername: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    emailAddressOrUsername: PropTypes.string,
    isSubmitting: PropTypes.bool,
    password: PropTypes.string,
    submitForm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleEmailAddressOrUsernameChange = ::this.handleEmailAddressOrUsernameChange
    this.handleKeyDown = ::this.handleKeyDown
    this.handlePasswordChange = ::this.handlePasswordChange
    this.handleSubmit = ::this.handleSubmit
  }

  handleEmailAddressOrUsernameChange(e) {
    e.preventDefault()

    this.props.changeEmailAddressOrUsername(e.target.value)
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

    const { emailAddressOrUsername, password } = this.props

    if (emailAddressOrUsername && password) {
      this.props.submitForm({ emailAddressOrUsername, password })
    }
  }

  render() {
    const {
      emailAddressOrUsername,
      password,
    } = this.props

    return (
      <form>
        <div className="mt2">
          <label>Email or username</label>
          <input type="text"
            className="block col-12 field"
            onChange={this.handleEmailAddressOrUsernameChange}
            onKeyDown={this.handleKeyDown}
            value={emailAddressOrUsername} />
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
            <span className="center">Log in</span>
          </Button>
        </div>
      </form>
    )
  }
}

function selectState(state) {
  return {
    emailAddressOrUsername: state.loginForm.emailAddressOrUsername,
    password: state.loginForm.password,
  }
}

function bindDispatch(dispatch) {
  return bindActionCreators(LoginFormActions, dispatch)
}

export default connect(selectState, bindDispatch)(LoginForm)
