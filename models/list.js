module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
        // listID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        listName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // dateCreated: {
        //     type: DataTypes.DATE,
        //     allowNull: false
        // },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example
    // List.associate = function(models) {
    //     List.hasMany(models.Item, {
    //       foreignKey: 'itemID',
    //       sourceKey: 'itemID',
    //       as: 'listItems'
    //     });
    //   };

    // List.associate = function(models) {
    //     List.belongsTo(models.User, {
    //       foreignKey: 'userID',
    //       onDelete: 'CASCADE',
    //       targetKey: 'userID',
    //       as: 'userLists'
    //     });
    //   };

return List;
};