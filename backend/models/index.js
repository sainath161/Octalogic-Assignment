const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const VehicleType = sequelize.define('VehicleType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Vehicle = sequelize.define('Vehicle', {
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: 'id'
    }
  }
});

const Booking = sequelize.define('Booking', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: 'id'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

VehicleType.hasMany(Vehicle, { foreignKey: 'typeId' });
Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId' });

module.exports = { sequelize, VehicleType, Vehicle, Booking };
