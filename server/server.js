const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
