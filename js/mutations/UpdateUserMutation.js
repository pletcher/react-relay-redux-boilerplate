import Relay from 'react-relay'

export default class UpdateUserMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`fragment on User { id }`
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        updatedUser: this.props.user.id,
      },
    }]
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateUserPayload {
        updatedUser {
          emailAddress,
          firstName,
          lastName,
        }
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { updateUser }`
  }

  getVariables() {
    return {
      emailAddress: this.props.emailAddress,
      firstName: this.props.firstName,
      id: this.props.user.id,
      lastName: this.props.lastName,
    }
  }
}
