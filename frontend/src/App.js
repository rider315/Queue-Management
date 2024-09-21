import React, { useState } from 'react';
// Use either QRCodeCanvas or QRCodeSVG depending on your preference
import { QRCodeCanvas } from 'qrcode.react';  // You can also use QRCodeSVG
import axios from 'axios';
import './index.css';

function App() {
  const [queueNumber, setQueueNumber] = useState(null);

  const handleScanQR = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/queue/generate');
      setQueueNumber(response.data.queueNumber);
    } catch (error) {
      console.error('Error generating queue number', error);
    }
  };

  return (
    <div className="App">
      <h1>Queue Management</h1>
      <QRCodeCanvas value="http://yourshop.com/scan" /> {/* Here, I used QRCodeCanvas */}
      <button onClick={handleScanQR}>Scan QR and Get Queue Number</button>
      {queueNumber && <h2>Your Queue Number is: {queueNumber}</h2>}
    </div>
  );
}

export default App;
