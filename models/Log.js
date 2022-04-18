module.exports = (sequelize, Model, DataTypes) => {
  class Log extends Model {}
  Log.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "log",
    }
  );
  return Log;
};
