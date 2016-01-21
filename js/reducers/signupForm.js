import {
  SIGNUP_FORM_EMAIL_ADDRESS_CHANGE,
  SIGNUP_FORM_PASSWORD_CHANGE,
  SIGNUP_FORM_SUBMITTED,
  SIGNUP_FORM_SUBMIT_FAILED,
  SIGNUP_FORM_SUBMIT_SUCCEEDED,
  SIGNUP_FORM_USERNAME_CHANGE
} from 'actions/signupForm'

export default function signupForm(state = {}, action) {
  switch (action.type) {
    case SIGNUP_FORM_EMAIL_ADDRESS_CHANGE:
      return {
        ...state,
        emailAddress: action.emailAddress,
      }
    case SIGNUP_FORM_PASSWORD_CHANGE:
      return {
        ...state,
        password: action.password,
      }
    case SIGNUP_FORM_USERNAME_CHANGE:
      return {
        ...state,
        username: action.username,
      }
    case SIGNUP_FORM_SUBMITTED:
      return {
        ...state,
        isSubmitting: true,
      }
    case SIGNUP_FORM_SUBMIT_FAILED:
      return {
        ...state,
        isSubmitting: false,
        error: action.transaction,
      }
    case SIGNUP_FORM_SUBMIT_SUCCEEDED:
      return {
        ...state,
        isSubmitting: false,
        emailAddress: '',
        password: '',
        username: '',
      }
    default:
      return state
  }
}
