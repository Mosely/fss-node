const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "report-columns",
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
    header: jagql.Joi.string(),
    tableName: jagql.Joi.string(),
    columnName: jagql.Joi.string(),
    columnOrder: jagql.Joi.number(),
    width: jagql.Joi.number(),
    report: jagql.Joi.one('report'),
    updatedBy: jagql.Joi.one('users'),
    reportCriterias: jagql.Joi.many('report-criteria')
  }
});