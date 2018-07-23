const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
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
    logging: console.log
  }),
  attributes: {
    streetNumber: jagql.Joi.number(),
    streetName: jagql.Joi.string(),
    streetSuffix: jagql.Joi.string(),
    zipcode: jagql.Joi.number(),
    zipcodePlusFour: jagql.Joi.number(),
    apartmentNumber: jagql.Joi.number(),
    cityData: jagql.Joi.one('cityData'),
    stateData: jagql.Joi.one('stateData'),
    countyData: jagql.Joi.one('countyData'),
    updatedBy: jagql.Joi.number().default(1)
  }
});