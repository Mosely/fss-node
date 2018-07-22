const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jsonApi.define({
  resource: "languages",
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
    name: jagql.Joi.string(),
    updatedBy: jagql.Joi.one('users'),
    clientLanguages: jagql.Joi.many('client-language')
  }
});