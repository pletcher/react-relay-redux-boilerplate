import cookies from 'lib/cookies'
import CreateViewerMutation from 'mutations/CreateViewerMutation'
import Relay from 'react-relay'

export const SIGNUP_FORM_EMAIL_ADDRESS_CHANGE = 'SIGNUP_FORM_EMAIL_ADDRESS_CHANGE'
export const SIGNUP_FORM_PASSWORD_CHANGE = 'SIGNUP_FORM_PASSWORD_CHANGE'
export const SIGNUP_FORM_SUBMITTED = 'SIGNUP_FORM_SUBMITTED'
export const SIGNUP_FORM_SUBMIT_FAILED = 'SIGNUP_FORM_SUBMIT_FAILED'
export const SIGNUP_FORM_SUBMIT_SUCCEEDED = 'SIGNUP_FORM_SUBMIT_SUCCEEDED'
export const SIGNUP_FORM_USERNAME_CHANGE = 'SIGNUP_FORM_USERNAME_CHANGE'

export function changeUsername(username) {
  return {
    username,
    type: SIGNUP_FORM_USERNAME_CHANGE
  }
}

export function changeEmailAddress(emailAddress) {
  return {
    emailAddress,
    type: SIGNUP_FORM_EMAIL_ADDRESS_CHANGE,
  }
}

export function changePassword(password) {
  return {
    password,
    type: SIGNUP_FORM_PASSWORD_CHANGE,
  }
}

export function submitForm(form) {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_FORM_SUBMITTED,
    })

    const onFailure = (transaction) => dispatch({
      transaction,
      type: SIGNUP_FORM_SUBMIT_FAILED,
    })

    const onSuccess = (response) => {
      const {
        createViewer: {
          viewer,
        },
      } = response
      cookies.set('jwt', viewer.authToken)

      return dispatch({
        viewer,
        type: SIGNUP_FORM_SUBMIT_SUCCEEDED,
      })
    }

    Relay.Store.commitUpdate(
      new CreateViewerMutation(form), {
        onFailure,
        onSuccess,
      }
    )
  }
}
