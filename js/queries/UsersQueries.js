import Relay from 'react-relay'

export default {
  user: () => Relay.QL`query { user(username: $username) }`,
  viewer: () => Relay.QL`query { viewer }`,
}
