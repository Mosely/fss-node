const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "reportCriterias",
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
    logging: process.env.DEBUG
  }),
  attributes: {
    relation: jagql.Joi.string(),
    criteriaValue: jagql.Joi.string(),
    isHidden: jagql.Joi.boolean(),
    reportColumn: jagql.Joi.one('reportColumns'),
    updatedBy: jagql.Joi.one('users')
  }
});