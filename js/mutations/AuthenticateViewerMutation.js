import Relay from 'react-relay'

export default class AuthenticateViewerMutation extends Relay.Mutation {
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on AuthenticateViewerPayload {
          viewer {
            authToken,
            id
          }
        }
      `]
    }]
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AuthenticateViewerPayload {
        viewer {
          id,
        }
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { authenticateViewer }`
  }

  getVariables() {
    return {
      emailAddressOrUsername: this.props.emailAddressOrUsername,
      password: this.props.password,
    }
  }
}
