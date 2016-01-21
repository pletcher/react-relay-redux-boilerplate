module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    })
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('users')
  }
};
