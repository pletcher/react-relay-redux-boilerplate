import {
  LOGIN_FORM_EMAIL_ADDRESS_OR_USERNAME_CHANGE,
  LOGIN_FORM_PASSWORD_CHANGE,
  LOGIN_FORM_SUBMITTED,
  LOGIN_FORM_SUBMIT_FAILED,
  LOGIN_FORM_SUBMIT_SUCCEEDED
} from 'actions/loginForm'

export default function loginForm(state = {}, action) {
  switch (action.type) {
    case LOGIN_FORM_EMAIL_ADDRESS_OR_USERNAME_CHANGE:
      return {
        ...state,
        emailAddressOrUsername: action.emailAddressOrUsername,
      }
    case LOGIN_FORM_PASSWORD_CHANGE:
      return {
        ...state,
        password: action.password,
      }
    case LOGIN_FORM_SUBMITTED:
      return {
        ...state,
        isSubmitting: true,
      }
    case LOGIN_FORM_SUBMIT_FAILED:
      return {
        ...state,
        isSubmitting: false,
        error: action.transaction,
      }
    case LOGIN_FORM_SUBMIT_SUCCEEDED:
      return {
        ...state,
        isSubmitting: false,
        emailAddressOrUsername: '',
        password: '',
      }
    default:
      return state
  }
}
