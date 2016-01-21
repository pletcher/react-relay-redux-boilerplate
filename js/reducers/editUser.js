import {
  EDIT_USER_EMAIL_ADDRESS_CHANGE,
  EDIT_USER_FIRST_NAME_CHANGE,
  EDIT_USER_LAST_NAME_CHANGE,
  EDIT_USER_FORM_SUBMITTED,
  EDIT_USER_FORM_SUBMIT_FAILED,
  EDIT_USER_FORM_SUBMIT_SUCCEEDED
} from 'actions/editUser'

export default function editUser(state = {}, action) {
  switch (action.type) {
    case EDIT_USER_EMAIL_ADDRESS_CHANGE:
      return {
        ...state,
        emailAddress: action.emailAddress,
      }
    case EDIT_USER_FIRST_NAME_CHANGE:
      return {
        ...state,
        firstName: action.firstName,
      }
    case EDIT_USER_LAST_NAME_CHANGE:
      return {
        ...state,
        lastName: action.lastName,
      }
    case EDIT_USER_FORM_SUBMITTED:
      return {
        ...state,
        submitting: true,
      }
    case EDIT_USER_FORM_SUBMIT_FAILED:
      return {
        ...state,
        submitting: false,
        error: action.transaction,
      }
    case EDIT_USER_FORM_SUBMIT_SUCCEEDED:
      return {
        ...state,
        submitting: false,
      }
    default:
      return state
  }
}
