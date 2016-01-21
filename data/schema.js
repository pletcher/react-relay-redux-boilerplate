import {
  // GraphQLBoolean,
  // GraphQLFloat,
  GraphQLID,
  // GraphQLInt,
  // GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import {
  // connectionArgs,
  // connectionDefinitions,
  // connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

import jwt from 'jsonwebtoken'

import db from '../models'
import { ONE_DAY } from '../js/constants'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)

    switch (type) {
      case 'User':
        return getUser(id)
      default:
        return null
    }
  },

  (obj) => {
    return getType(obj)
  }
)

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user -- can be a Student, a Tutor, or both',
  fields: () => ({
    id: globalIdField('User'),
    authToken: {
      description: 'Only returned for viewer',
      type: GraphQLString,
    },
    emailAddress: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLString }
  }),
  interfaces: [nodeInterface],
})

const AuthenticateViewerMutation = mutationWithClientMutationId({
  name: 'AuthenticateViewer',

  inputFields: {
    emailAddressOrUsername: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  outputFields: {
    viewer: {
      type: userType,
      resolve: user => user,
    },
  },

  mutateAndGetPayload: ({ emailAddressOrUsername, password }) => {
    return db.User.findByEmailAddressOrUsername(emailAddressOrUsername).then(u => {
      if (u && u.verifyPassword(password)) {
        const user = u.get()
        const authToken = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: ONE_DAY,
          issuer: 'mission_hacks',
        })

        return { ...user, authToken }
      }

      return null
    })
  }
})

const CreateViewerMutation = mutationWithClientMutationId({
  name: 'CreateViewer',

  inputFields: {
    emailAddress: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  outputFields: {
    viewer: {
      type: userType,
      resolve: user => user,
    },
  },

  mutateAndGetPayload: ({ emailAddress, password, username }) => {
    return db.User.create({ emailAddress, password, username }).then(u => {
      const user = u.get()
      const authToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: ONE_DAY,
        issuer: 'mission_hacks',
      })

      return { ...user, authToken }
    })
  }
})

const UpdateUserMutation = mutationWithClientMutationId({
  name: 'UpdateUser',

  inputFields: {
    emailAddress: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: GraphQLString,
    },
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    lastName: {
      type: GraphQLString,
    },
  },

  outputFields: {
    updatedUser: {
      type: userType,
      resolve: user => user,
    },
  },

  mutateAndGetPayload: ({ emailAddress, firstName, id, lastName }, { rootValue: { viewer: { id: viewerId } } }) => {
    const { id: userId } = fromGlobalId(id)

    if (userId === viewerId) {
      return db.User.findById(userId).then(u => {
        return u.update({ emailAddress, firstName, lastName }).then(uu => uu.get())
      })
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    authenticateViewer: AuthenticateViewerMutation,
    createViewer: CreateViewerMutation,
    updateUser: UpdateUserMutation,
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      args: {
        id: {
          description: "The user's id",
          type: GraphQLID,
        },
        username: {
          description: "The user's username",
          type: GraphQLString,
        }
      },
      resolve: (parent, { id, username }) => {
        let query

        if (id) {
          query = db.User.findById(id)
        } else {
          query = db.User.findOne({
            where: {
              username
            }
          })
        }

        return query.then(user => user.get())
      },
    },
    viewer: {
      type: userType,
      resolve: (parent, _, { rootValue: { viewer } }) => {
        return viewer
      },
    },
  }),
})

export const Schema = new GraphQLSchema({
  mutation: mutationType,
  query: queryType,
})

function getType(obj) {
  if (obj instanceof User) {
    return userType
  }

  return null
}
