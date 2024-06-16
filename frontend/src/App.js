import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, RadioGroup, Radio, FormControlLabel, Button, Container, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const styles = {
  body:{
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    fontFamily: 'Arial, sans-serif',
    margin: '0',
    padding: '0',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '2rem',
  },
  name: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
  },
  wheels: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
  },
  type: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
  },
  model: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
  },
  dates: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '2rem',
    padding: '.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column', // Default: flex row
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: '1rem',
    width: '15%',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
  },
  back: {
    marginTop: '1rem',
    marginRight: '1rem',
    width: '15%',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
  },
  stepIndicator: {
    marginBottom: '1rem',
    borderBottom: '1px solid #ccc',
    paddingBottom: '0.5rem',
  },
  responsiveContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dateRangePicker: {
    width: '100%',
    maxWidth: '600px',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row', // Default: flex row
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRangePick: {
    width: '100%',
    maxWidth: '600px',
    // padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    backgroundColor: '#fff',
  },
  dateRangePickerColumn: {
    flexDirection: 'column', // Flex direction as column for small screens
    alignItems: 'stretch', // Stretch items to fit container
  },
};

const vehicleTypesData = [
  { id: '1', name: 'Scooter', wheels: '2' },
  { id: '2', name: 'Motorcycle', wheels: '2' },
  { id: '3', name: 'Cruiser', wheels: '2' },
  { id: '4', name: 'Hatchback', wheels: '4' },
  { id: '5', name: 'Sedan', wheels: '4' },
  { id: '6', name: 'SUV', wheels: '4' },
  { id: '7', name: 'Minivan', wheels: '4' },
  { id: '8', name: 'Convertible', wheels: '4' },
  { id: '9', name: 'Pickup Truck', wheels: '4' },
  { id: '10', name: 'Luxury Car', wheels: '4' }
];

const vehicleModelsData = [
  { id: '1', typeId: '1', model: 'Activa' },
  { id: '2', typeId: '1', model: 'Jupiter' },
  { id: '3', typeId: '1', model: 'Access' },
  { id: '4', typeId: '2', model: 'Ninja 300' },
  { id: '5', typeId: '2', model: 'Royal Enfield Bullet' },
  { id: '6', typeId: '2', model: 'Yamaha FZ-S' },
  { id: '7', typeId: '3', model: 'Harley-Davidson Fat Boy' },
  { id: '8', typeId: '3', model: 'Indian Scout' },
  { id: '9', typeId: '3', model: 'Triumph Bonneville' },
  { id: '10', typeId: '4', model: 'Maruti Suzuki Swift' },
  { id: '11', typeId: '4', model: 'Hyundai i20' },
  { id: '12', typeId: '4', model: 'Volkswagen Polo' },
  { id: '13', typeId: '5', model: 'Honda Civic' },
  { id: '14', typeId: '5', model: 'Toyota Corolla' },
  { id: '15', typeId: '5', model: 'Ford Fusion' },
  { id: '16', typeId: '6', model: 'Toyota RAV4' },
  { id: '17', typeId: '6', model: 'Honda CR-V' },
  { id: '18', typeId: '6', model: 'Nissan Rogue' },
  { id: '19', typeId: '7', model: 'Honda Odyssey' },
  { id: '20', typeId: '7', model: 'Chrysler Pacifica' },
  { id: '21', typeId: '7', model: 'Toyota Sienna' },
  { id: '22', typeId: '8', model: 'BMW 4 Series Convertible' },
  { id: '23', typeId: '8', model: 'Mercedes-Benz E-Class Cabriolet' },
  { id: '24', typeId: '8', model: 'Audi A5 Cabriolet' },
  { id: '25', typeId: '9', model: 'Ford F-150' },
  { id: '26', typeId: '9', model: 'Chevrolet Silverado' },
  { id: '27', typeId: '9', model: 'Ram 1500' },
  { id: '28', typeId: '10', model: 'Tesla Model S' },
  { id: '29', typeId: '10', model: 'Mercedes-Benz S-Class' },
  { id: '30', typeId: '10', model: 'Porsche Panamera' }
];

function App() {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState({ firstName: '', lastName: '' });
  const [wheels, setWheels] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const theme = useTheme(); // Retrieve theme object
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile

  useEffect(() => {
    if (wheels) {
      const filteredTypes = vehicleTypesData.filter(type => type.wheels === wheels);
      setVehicleTypes(filteredTypes);
    }
  }, [wheels]);

  useEffect(() => {
    if (vehicleType) {
      const filteredModels = vehicleModelsData.filter(model => model.typeId === vehicleType);
      setVehicles(filteredModels);
    }
  }, [vehicleType]);

  const handleNext = () => {
    switch (step) {
      case 0:
        if (userName.firstName && userName.lastName) {
          setStep(step + 1);
        } else {
          alert('Please enter your first and last name');
        }
        break;
      case 1:
        if (wheels === '2' || wheels === '4') {
          setStep(step + 1);
        } else {
          alert('Please select the number of wheels');
        }
        break;
      case 2:
        if (vehicleType) {
          setStep(step + 1);
        } else {
          alert('Please select a vehicle type');
        }
        break;
      case 3:
        if (vehicle) {
          setStep(step + 1);
        } else {
          alert('Please select a specific vehicle model');
        }
        break;
      case 4:
        const startDate = dateRange[0].startDate;
        const endDate = dateRange[0].endDate;
        if (startDate && endDate) {
          const bookingData = {
            userName: `${userName.firstName} ${userName.lastName}`,
            vehicleId: vehicle,
            startDate,
            endDate
          };
          console.log(bookingData);
          alert('Booking successful! (simulated)');
          resetForm();
        } else {
          alert('Please select start and end dates for booking');
        }
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setStep(0);
    setUserName({ firstName: '', lastName: '' });
    setWheels('');
    setVehicleType('');
    setVehicle('');
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Box style={{ ...styles.name, ...styles.responsiveContainer }}>
            <Typography variant="h6" style={styles.stepIndicator}>Step 1: Enter Your Name</Typography>
            <TextField
              label="First Name"
              value={userName.firstName}
              onChange={(e) => setUserName({ ...userName, firstName: e.target.value })}
              fullWidth
              style={{ marginBottom: '1rem' }}
              variant="outlined"
            />
            <TextField
              label="Last Name"
              value={userName.lastName}
              onChange={(e) => setUserName({ ...userName, lastName: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Box>
        );
      case 1:
        return (
          <Box style={{ ...styles.wheels, ...styles.responsiveContainer }}>
            <Typography variant="h6" style={styles.stepIndicator}>Step 2: Select Number of Wheels</Typography>
            <RadioGroup value={wheels} onChange={(e) => setWheels(e.target.value)} row>
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="2 Wheels"
              />
              <FormControlLabel
                value="4"
                control={<Radio color="primary" />}
                label="4 Wheels"
              />
            </RadioGroup>
          </Box>
        );
      case 2:
        return (
          <Box style={{ ...styles.type, ...styles.responsiveContainer }}>
            <Typography variant="h6" style={styles.stepIndicator}>Step 3: Select Vehicle Type</Typography>
            <RadioGroup value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} row>
              {vehicleTypes.map(type => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio color="primary" />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </Box>
        );
      case 3:
        return (
          <Box style={{ ...styles.model, ...styles.responsiveContainer }}>
            <Typography variant="h6" style={styles.stepIndicator}>Step 4: Select Vehicle Model</Typography>
            <RadioGroup value={vehicle} onChange={(e) => setVehicle(e.target.value)} row>
              {vehicles.map(model => (
                <FormControlLabel
                  key={model.id}
                  value={model.id}
                  control={<Radio color="primary" />}
                  label={model.model}
                />
              ))}
            </RadioGroup>
          </Box>
        );
      case 4:
        return (
          <Box style={{ ...styles.dates, ...(isMobile && styles.dateRangePickerColumn) }}>
            <Typography variant="h6" style={styles.stepIndicator}>Step 5: Select Booking Dates</Typography>
            {isMobile && (
              <Typography variant="subtitle1" style={{ marginBottom: '1rem' }}>Select Range:</Typography>
            )}
            <DateRangePicker
              style={styles.dateRangePick}
              onChange={item => setDateRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              months={1}
              direction="horizontal"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom>Vehicle Booking System</Typography>
      {renderStep()}
      <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {step > 0 && (
          <Button variant="contained" color="primary" onClick={() => setStep(step - 1)} style={styles.back}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={styles.button}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={styles.button}
          >
            Book Now
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default App;
