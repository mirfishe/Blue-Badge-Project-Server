module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
      itemName: {
          type: DataTypes.STRING,
          allowNull: false
        },
      itemURL: {
          type: DataTypes.STRING,
          allowNull: true
        },
      imageURL: {
          type: DataTypes.STRING,
          allowNull: true
        },
      dateAdded: {
          type: DataTypes.DATE,
          allowNull: false
        },
      sortID: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
      listID: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      })
  return Item;
}