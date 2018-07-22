const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "cityDataExtendeds",
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
    city: jagql.Joi.one('cs'),
    stateCode: jagql.Joi.one('stateCs'),
    updatedBy: jagql.Joi.one('users')
  }
});