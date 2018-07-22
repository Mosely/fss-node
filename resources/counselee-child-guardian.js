const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jsonApi.define({
  resource: "counselee-child-guardians",
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
    age: jagql.Joi.number(),
    occupation: jagql.Joi.string(),
    isCurrentlyLivingWithChild: jagql.Joi.boolean(),
    dateFirstLivedWithChild: jagql.Joi.date(),
    counseleeChild: jagql.Joi.one('counselee-child'),
    updatedBy: jagql.Joi.one('users')
  }
});