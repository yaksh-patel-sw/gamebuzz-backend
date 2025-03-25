const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});