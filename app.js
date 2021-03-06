require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/user-controller');
const list = require('./controllers/list-controller');
const item = require('./controllers/item-controller');
const search = require('./controllers/search-controller');
const game = require('./controllers/game-controller');

sequelize.sync();

// Forces the database to drop the tables and create them with the new models
// https://bezkoder.com/sequelize-associate-one-to-many/
// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

app.use('/list', list);

app.use('/item', item);

app.use('/search', search);

app.use('/game', game);

app.listen(process.env.PORT || 4000, function() { 
  console.log(`App is listening on port ${process.env.PORT}`);
}
);
