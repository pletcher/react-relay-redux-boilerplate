import Relay from 'react-relay'

export default class CreateViewerMutation extends Relay.Mutation {
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on CreateViewerPayload {
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
      fragment on CreateViewerPayload {
        viewer {
          id,
        }
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { createViewer }`
  }

  getVariables() {
    return {
      emailAddress: this.props.emailAddress,
      password: this.props.password,
      username: this.props.username,
    }
  }
}
