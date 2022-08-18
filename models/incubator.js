'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incubator extends Model {
    static associate(models) {
      Incubator.hasMany(models.Startup, {
        foreignKey : "IncubatorId"
      })
    }
  }
  Incubator.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Name is Required'
        },
        notNull: {
          msg: 'Name is Required'
        }
      }
    },
    code: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Location is Required'
        },
        notNull: {
          msg: 'Location is Required'
        }
      }
    },
    level: {
      type : DataTypes.STRING,
      allowNull :false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Choose level'
        },
        notNull : {
          msg : 'Choose level'
        },
        isIn : {
          args : [['International', 'National', 'Province']],
          msg : "Choose between International, National, or Province"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Incubator',
  });

  Incubator.beforeCreate((formatCode) => {
    let x = ''
    if (formatCode.level === "International") { x = "1992-A" }
    else if (formatCode.level === "National") { x = "1994-B" }
    else if (formatCode.level === "Province") { x = "1996-C" }

    let y = new Date(formatCode.createdAt).getTime()

    formatCode.code = `${x}-${y}`
  });

  return Incubator;
};