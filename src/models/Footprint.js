import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import User from './User.js';

const Footprint = sequelize.define('Footprint', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(200)
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isIn: [[0, 1, 2]]
    }
  },
  gift: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_user_giver: {
    type: DataTypes.BIGINT
  },
  id_user_receiver: {
    type: DataTypes.BIGINT
  },
  email_user_giver: {
    type: DataTypes.STRING(50)
  },
  email_user_receiver: {
    type: DataTypes.STRING(50)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize,
  modelName: 'Footprint',
  tableName: 'footprints',
  timestamps: false
});

Footprint.belongsTo(User, { foreignKey: 'id_user_giver', as: 'giver' });
Footprint.belongsTo(User, { foreignKey: 'id_user_receiver', as: 'receiver' });

export default Footprint;
