require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/user-controller');
const list = require('./controllers/list-controller');
const item = require('./controllers/item-controller');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));

// app.use('/user', user);

// app.use('/list', list);

// app.use('/item', item);


app.listen(process.env.PORT, function() { 
  console.log(`App is listening on port ${process.env.PORT}`);
}
);
