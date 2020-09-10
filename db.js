const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
    host:   'localhost',
    dialect:    'postgres'
});

sequelize.authenticate()
    .then(() => console.log('postgres db is connected.'))
    .catch(err => console.log(err));

module.exports = sequelize;