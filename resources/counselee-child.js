const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "counseleeChildren",
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
    schoolProblems: jagql.Joi.string(),
    longStandingIllnesses: jagql.Joi.string(),
    whoElseRaisedChild: jagql.Joi.string(),
    school: jagql.Joi.one('schools'),
    updatedBy: jagql.Joi.one('users')
  }
});