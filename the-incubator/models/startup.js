'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Startup extends Model {
    
    // GETTER AGE
    get age () {
      let x = new Date(this.dateFound).getFullYear()
      let result = new Date().getFullYear() - x
      return result
    }

    get formatDate() {
      return this.dateFound.toISOString().split("T")[0]
    }

    static getStartUpByRoleOfFounder(role) {
      let attributes = {}
      if (role === 'hustler') {
        attributes.where = { 
          roleOfFounder: 'Hustler' 
        }
      } else if (role === 'hacker') {
        attributes.where = { 
          roleOfFounder: 'Hacker' 
        }
      } else if (role === 'hipster') {
        attributes.where = { 
          roleOfFounder: 'Hipster'
        }
      }
      attributes.include = 'Incubator'
      attributes.order = [['valuation', 'DESC']]
      return Startup.findAll(attributes)
    }

    static associate(models) {
      Startup.belongsTo(models.Incubator, {
        foreignKey : "IncubatorId"
      })
    }
  }
  Startup.init({
    startUpName: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Start Up Name Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Start Up Name Cannot Be Null"
        }
      }
    },
    founderName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Type Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Type Cannot Be Null"
        }
      }
    },
    dateFound: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Date Found Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Date Found Cannot Be Null"
        },
        startUpAge(value){
          if(this.age < 5){
            throw new Error(`Minimum startup age is 5`)
          }
        }
      }
    },
    educationOfFounder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Education Of Founder Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Education Of Founder Cannot Be Null"
        }
      }
    },
    roleOfFounder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Role Of Founder Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Start Up Name Cannot Be Null"
        },
        roleHustlerMin(value){
          if (value === `Hustler`){
            if (this.educationOfFounder !== `S2` || this.educationOfFounder !== `S3`) {
              throw new Error(`Education must higher than S2 for role Hustler`)
            }
          }
        }
      }
    },
    IncubatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Incubator ID Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Incubator ID Cannot Be Null"
        }
      }
    },
    valuation : {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Valuation Cannot Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Valuation Cannot Be Null"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Startup',
  });
  return Startup;
};