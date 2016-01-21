import cookies from 'lib/cookies'

export function logOut() {
  cookies.delete('jwt')

  window.location = '/'
}
