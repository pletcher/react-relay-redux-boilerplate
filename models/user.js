import bcrypt from 'bcrypt'

const USERNAME_REGEX = /^[a-zA-Z0-9\._]*$/

export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deletedAt: DataTypes.DATE,
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return null
      },
      set(password) {
        this.setDataValue(
          'password',
          bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        )
      },
      validate: {
        len: [6, 80],
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumericDotOrUnderscore(username) {
          return USERNAME_REGEX.test(username)
        },
        len: [1, 20],
        notEmpty: true,
      }
    }
  }, {
    classMethods: {
      findByEmailAddressOrUsername(emailAddressOrUsername) {
        if (emailAddressOrUsername.indexOf('@') > -1) {
          return User.findOne({
            where: {
              emailAddress: emailAddressOrUsername,
            },
          })
        }

        return User.findOne({
          where: {
            username: emailAddressOrUsername,
          },
        })
      },
    },
    instanceMethods: {
      verifyPassword(password) {
        return bcrypt.compareSync(password, this.getDataValue('password'))
      },
    },
    paranoid: true,
    tableName: 'users',
    timestamps: true,
  })

  return User
}
