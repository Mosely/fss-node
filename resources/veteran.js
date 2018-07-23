const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "veterans",
  handlers: new RelationalDbStore({
    dialect: process.env.DB_DRIVER,
    dialectOptions: {
      supportBigNumbers: true
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: console.log
  }),
  attributes: {
    referredBy: jagql.Joi.string(),
    hasDd214: jagql.Joi.boolean(),
    isRegisteredWithVa: jagql.Joi.boolean(),
    vaId: jagql.Joi.number(),
    jobTitle: jagql.Joi.string(),
    isOnDisability: jagql.Joi.boolean(),
    isHomeless: jagql.Joi.boolean(),
    householdIncome: jagql.Joi.number(),
    branchOfService: jagql.Joi.one('branchesOfService'),
    militaryDischargeType: jagql.Joi.one('militaryDischargeTypes'),
    updatedBy: jagql.Joi.number().default(1)
  }
});