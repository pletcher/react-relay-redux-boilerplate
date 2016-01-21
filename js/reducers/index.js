import { combineReducers } from 'redux'
import editUser from 'reducers/editUser'
import loginForm from 'reducers/loginForm'
import signupForm from 'reducers/signupForm'

export default combineReducers({
  editUser,
  loginForm,
  signupForm,
})
