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

    User.hasMany(List, {
        foreignKey: {
            onDelete: 'cascade'
        }
    });
    List.belongsTo(User, {
        foreignKey: {
            onDelete: 'cascade'
        }
    });

    List.hasMany(Item, {
        
            onDelete: 'cascade',
            hooks: true
        
    });
    Item.belongsTo(List, {
        foreignKey: {
            onDelete: 'cascade'
        }
    });

module.exports = sequelize;