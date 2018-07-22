const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jsonApi.define({
  resource: "person-addresses",
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
    isPrimary: jagql.Joi.boolean(),
    person: jagql.Joi.one('person'),
    address: jagql.Joi.one('address'),
    updatedBy: jagql.Joi.one('users')
  }
});