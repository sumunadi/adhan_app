import React from 'react';
import PrayerTimings from './Components/PrayerTimings';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
  return (
    <Container component="main" maxWidth="sm">
    <Typography variant="h2" component="h1" gutterBottom align="center" style={{ margin: '20px 0'}}>
    Prayer Timings
    </Typography>
      <PrayerTimings />
    </Container>
  );
}
export default App;