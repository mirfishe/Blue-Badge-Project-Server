const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
    host:   'localhost',
    dialect:    'postgres'
});

sequelize.authenticate()
    .then(() => console.log('postgres db is connected.'))
    .catch(err => console.log(err));


    const User = sequelize.import('./models/user');
    const List = sequelize.import('./models/list');
    const Item = sequelize.import('./models/item');

    User.hasMany(List);
    List.belongsTo(User);

    List.hasMany(Item);
    Item.belongsTo(List);

module.exports = sequelize;