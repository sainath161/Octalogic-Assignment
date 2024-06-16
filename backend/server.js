const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define the VehicleType model
const VehicleType = sequelize.define('VehicleType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Define the Vehicle model
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

// Define the Booking model
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

// Get all vehicle types
app.get('/vehicle-types', async (req, res) => {
    const types = await VehicleType.findAll();
    res.json(types);
});

// Get vehicles by type ID
app.get('/vehicles/:typeId', async (req, res) => {
    const vehicles = await Vehicle.findAll({ where: { typeId: req.params.typeId } });
    res.json(vehicles);
});

// Create a new booking
app.post('/bookings', async (req, res) => {
    const { userName, vehicleId, startDate, endDate } = req.body;

    // Check for overlapping bookings
    const overlappingBookings = await Booking.findAll({
        where: {
            vehicleId,
            [Sequelize.Op.or]: [
                {
                    startDate: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                {
                    endDate: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                {
                    [Sequelize.Op.and]: [
                        {
                            startDate: {
                                [Sequelize.Op.lte]: startDate
                            }
                        },
                        {
                            endDate: {
                                [Sequelize.Op.gte]: endDate
                            }
                        }
                    ]
                }
            ]
        }
    });

    if (overlappingBookings.length > 0) {
        return res.status(400).json({ error: 'Vehicle is already booked for the selected dates' });
    }

    await Booking.create({ userName, vehicleId, startDate, endDate });
    res.status(201).json({ message: 'Booking successful' });
});

// Sync database and seed initial data
sequelize.sync({ force: true }).then(async () => {
    const hatchback = await VehicleType.create({ name: 'Hatchback' });
    const suv = await VehicleType.create({ name: 'SUV' });
    const sedan = await VehicleType.create({ name: 'Sedan' });
    const cruiser = await VehicleType.create({ name: 'Cruiser' });

    await Vehicle.create({ model: 'Toyota Yaris', typeId: hatchback.id });
    await Vehicle.create({ model: 'Ford EcoSport', typeId: suv.id });
    await Vehicle.create({ model: 'Honda Accord', typeId: sedan.id });
    await Vehicle.create({ model: 'Harley Davidson', typeId: cruiser.id });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
