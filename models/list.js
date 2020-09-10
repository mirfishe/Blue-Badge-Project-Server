module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
        listName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
return List;
}