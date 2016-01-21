import Relay from 'react-relay'
import UpdateUserMutation from 'mutations/UpdateUserMutation'

export const EDIT_USER_EMAIL_ADDRESS_CHANGE = 'EDIT_USER_EMAIL_ADDRESS_CHANGE'
export const EDIT_USER_FIRST_NAME_CHANGE = 'EDIT_USER_FIRST_NAME_CHANGE'
export const EDIT_USER_LAST_NAME_CHANGE = 'EDIT_USER_LAST_NAME_CHANGE'
export const EDIT_USER_FORM_SUBMITTED = 'EDIT_USER_FORM_SUBMITTED'
export const EDIT_USER_FORM_SUBMIT_FAILED = 'EDIT_USER_FORM_SUBMIT_FAILED'
export const EDIT_USER_FORM_SUBMIT_SUCCEEDED = 'EDIT_USER_FORM_SUBMIT_SUCCEEDED'

export function changeEmailAddress(emailAddress) {
  return {
    emailAddress,
    type: EDIT_USER_EMAIL_ADDRESS_CHANGE,
  }
}

export function changeFirstName(firstName) {
  return {
    firstName,
    type: EDIT_USER_FIRST_NAME_CHANGE,
  }
}

export function changeLastName(lastName) {
  return {
    lastName,
    type: EDIT_USER_LAST_NAME_CHANGE,
  }
}

export function submitForm(form, done) {
  return (dispatch) => {
    dispatch({
      type: EDIT_USER_FORM_SUBMITTED,
    })

    const onFailure = (transaction) => dispatch({
      transaction,
      type: EDIT_USER_FORM_SUBMIT_FAILED,
    })

    const onSuccess = (response) => {
      dispatch({
        response,
        type: EDIT_USER_FORM_SUBMIT_SUCCEEDED,
      })

      done()
    }

    Relay.Store.commitUpdate(
      new UpdateUserMutation(form), {
        onFailure,
        onSuccess,
      }
    )
  }
}
