const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "counseleecounselingtopics",
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
    otherNote: jagql.Joi.string(),
    counselee: jagql.Joi.one('counselee'),
    counselingTopic: jagql.Joi.one('counseling-topic'),
    updatedBy: jagql.Joi.one('users')
  }
});