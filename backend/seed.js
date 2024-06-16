const { sequelize, VehicleType, Vehicle } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  const hatchback = await VehicleType.create({ name: 'Hatchback' });
  const suv = await VehicleType.create({ name: 'SUV' });
  const sedan = await VehicleType.create({ name: 'Sedan' });
  const cruiser = await VehicleType.create({ name: 'Cruiser' });

  await Vehicle.create({ model: 'Model X', typeId: hatchback.id });
  await Vehicle.create({ model: 'Model Y', typeId: suv.id });
  await Vehicle.create({ model: 'Model Z', typeId: sedan.id });
  await Vehicle.create({ model: 'Model A', typeId: cruiser.id });
}

seed();
