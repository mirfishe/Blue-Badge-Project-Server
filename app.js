require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');


sequelize.sync();

app.use(express.json());





app.listen(process.env.PORT, function() { 
  console.log(`App is listening on port ${process.env.PORT}`);
}
);
