const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jagql.define({
  resource: "city-data-extendeds",
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
    zip: jagql.Joi.number(),
    latitude: jagql.Joi.number(),
    longitude: jagql.Joi.number(),
    county: jagql.Joi.string(),
    city: jagql.Joi.one('c'),
    stateCode: jagql.Joi.one('state-c'),
    updatedBy: jagql.Joi.one('users')
  }
});