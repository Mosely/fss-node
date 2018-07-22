const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jsonApi.define({
  resource: "addresses",
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
    streetNumber: jagql.Joi.number(),
    streetName: jagql.Joi.string(),
    streetSuffix: jagql.Joi.string(),
    zipcode: jagql.Joi.number(),
    zipcodePlusFour: jagql.Joi.number(),
    apartmentNumber: jagql.Joi.number(),
    cityData: jagql.Joi.one('city-data'),
    stateData: jagql.Joi.one('state-data'),
    countyData: jagql.Joi.one('county-data'),
    updatedBy: jagql.Joi.one('users'),
    personAddresses: jagql.Joi.many('person-address')
  }
});