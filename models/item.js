module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
      // itemID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
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
      // dateAdded: {
      //     type: DataTypes.DATE,
      //     allowNull: false
      //   },
      sortID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
      // listID: {
      //       type: DataTypes.INTEGER,
      //       allowNull: false
      //   }
      });

    // https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example
      // Item.associate = function(models) {
      //   Item.belongsTo(models.List, {
      //     foreignKey: 'listID',
      //     targetKey: 'listID',
      //     as: 'listItems'
      //   });
      // };

  return Item;
};