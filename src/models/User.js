import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false
  },
  jwt_token: {
    type: DataTypes.STRING(1024)
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  full_name: {
    type: DataTypes.STRING(50)
  },
  last_name: {
    type: DataTypes.STRING(50)
  },
  address: {
    type: DataTypes.STRING(255)
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rol: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Just is a user
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false
});

export default User;
