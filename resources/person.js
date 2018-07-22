const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jsonApi.define({
  resource: "people",
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
    firstName: jagql.Joi.string(),
    lastName: jagql.Joi.string(),
    middleName: jagql.Joi.string(),
    dateOfBirth: jagql.Joi.date(),
    age: jagql.Joi.number(),
    gender: jagql.Joi.one('gender'),
    updatedBy: jagql.Joi.one('users'),
    personAddresses: jagql.Joi.many('person-address'),
    personPhones: jagql.Joi.many('person-phone')
  }
});