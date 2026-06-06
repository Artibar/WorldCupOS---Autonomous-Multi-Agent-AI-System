import React from 'react';
import './index.css';
import {Booking} from './pages/Booking.jsx';
// import {CommandCenter} from './pages/CommandCenter.jsx';
// import {CrowdMonitor} from './pages/CrowdMonitor.jsx'
// import {FraudDashboard} from './pages/FraudDashboard.jsx'

function App() {
  return (
    <div className="w-full h-screen">
      <Booking />
      {/* <CommandCenter/>
      <CrowdMonitor/>
      <FraudDashboard/> */}
    </div>
  );
}

export default App;
