const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth-routes');
const absenRoutes = require('./routes/absen-routes')
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(cors());
app.use(express.json()); 

app.use('/auth', authRoutes);
app.use('/absen', absenRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(3001, () => console.log('Auth service running on http://localhost:3001'));
});
