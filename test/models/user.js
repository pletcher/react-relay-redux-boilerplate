import db from '../../models'

const User = db.User

describe('User', () => {
  afterEach(() => User.sync({ force: true }))

  describe('.create', () => {
    it('creates a new user', () => {
      return expect(User.create({
        emailAddress: 'email@email.com',
        password: 'password',
        username: 'username',
      })).to.eventually.have.property('emailAddress')
    })

    it('validates the email address', () => {
      return User.create({
        emailAddress: 'notAnEmail',
        password: 'password',
        username: 'username',
      }).catch(error => {
        expect(error.message).to.equal('Validation error: Validation isEmail failed')
      })
    })

    it('does not allow a null emailAddress', () => {
      return User.create({
        password: 'password',
        username: 'username',
      }).catch(error => {
        expect(error.message).to.equal('notNull Violation: emailAddress cannot be null')
      })
    })

    it('does not allow a null password', () => {
      return User.create({
        emailAddress: 'email@email.com',
        username: 'username',
      }).catch(error => {
        expect(error.message).to.equal('notNull Violation: password cannot be null')
      })
    })

      it('does not allow a null username', () => {
        return User.create({
          emailAddress: 'email@email.com',
          password: 'password',
        }).catch(error => {
          expect(error.message).to.equal('notNull Violation: username cannot be null')
        })
      })

    it('ensures unique emailAddress', () => {
      return User.create({
        emailAddress: 'email@email.com',
        password: 'password',
        username: 'username',
      }).then(() => {
        User.create({
          emailAddress: 'email@email.com',
          password: 'password',
          username: 'username2',
        }).catch(error => {
          expect(error.message).to.equal('Validation error')
        })
      })
    })

    it('ensures unique username', () => {
      return User.create({
        emailAddress: 'email@email.com',
        password: 'password',
        username: 'username',
      }).then(() => {
        User.create({
          emailAddress: 'email2@email.com',
          password: 'password',
          username: 'username',
        }).catch(error => {
          expect(error.message).to.equal('Validation error')
        })
      })
    })

    it('ensures alphanumeric, dot, or underscore username', () => {
      return User.create({
        emailAddress: 'email@email.com',
        password: 'password',
        username: 'username@',
      }).catch(error => {
        expect(error.message).to.equal('Validation error')
      })
    })
  })

  describe('.findByEmailAddressOrUsername', () => {
    beforeEach(() => {
      return User.create({
        emailAddress: 'email@email.com',
        password: 'password',
        username: 'username',
      })
    })

    it('finds a User by emailAddress', () => {
      return User.findByEmailAddressOrUsername('email@email.com').then(user => {
        expect(user.get('username')).to.equal('username')
      })
    })

    it('finds a User by username', () => {
      return User.findByEmailAddressOrUsername('username').then(user => {
        expect(user.get('emailAddress')).to.equal('email@email.com')
      })
    })
  })

  describe('#verifyPassword', () => {
    beforeEach(() => {
      return User.create({
        emailAddress: 'email@email.com',
        password: 'password',
        username: 'username',
      })
    })

    it('returns true for the correct password', () => {
      return User.findOne({ where: { emailAddress: 'email@email.com' } }).
        then(user => {
          expect(user.verifyPassword('password')).to.equal(true)
        }
      )
    })

    it('returns false for an invalid password', () => {
      return User.findOne({ where: { emailAddress: 'email@email.com' } }).
        then(user => {
          expect(user.verifyPassword('wrong')).to.equal(false)
        }
      )
    })
  })
})
