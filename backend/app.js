const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const queueRoutes = require('./routes/queue');

const app = express();
app.use(cors({
  origin: 'http://13.127.38.42',  // Your EC2 IP address
}));
app.use(bodyParser.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

// Routes
app.use('/api/queue', queueRoutes);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
