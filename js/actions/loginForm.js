import cookies from 'lib/cookies'
import AuthenticateViewerMutation from 'mutations/AuthenticateViewerMutation'
import Relay from 'react-relay'

export const LOGIN_FORM_EMAIL_ADDRESS_OR_USERNAME_CHANGE = 'LOGIN_FORM_EMAIL_ADDRESS_OR_USERNAME_CHANGE'
export const LOGIN_FORM_PASSWORD_CHANGE = 'LOGIN_FORM_PASSWORD_CHANGE'
export const LOGIN_FORM_SUBMITTED = 'LOGIN_FORM_SUBMITTED'
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED'
export const LOGIN_FORM_SUBMIT_SUCCEEDED = 'LOGIN_FORM_SUBMIT_SUCCEEDED'

export function changeEmailAddressOrUsername(emailAddressOrUsername) {
  return {
    emailAddressOrUsername,
    type: LOGIN_FORM_EMAIL_ADDRESS_OR_USERNAME_CHANGE
  }
}

export function changePassword(password) {
  return {
    password,
    type: LOGIN_FORM_PASSWORD_CHANGE,
  }
}

export function submitForm(form) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_FORM_SUBMITTED,
    })

    const onFailure = (transaction) => dispatch({
      transaction,
      type: LOGIN_FORM_SUBMIT_FAILED,
    })

    const onSuccess = (response) => {
      const {
        authenticateViewer: {
          viewer,
        },
      } = response

      cookies.set('jwt', viewer.authToken)

      return dispatch({
        viewer,
        type: LOGIN_FORM_SUBMIT_SUCCEEDED,
      })
    }

    Relay.Store.commitUpdate(
      new AuthenticateViewerMutation(form), {
        onFailure,
        onSuccess,
      }
    )
  }
}
