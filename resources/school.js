const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "schools",
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
    name: jagql.Joi.string(),
    street: jagql.Joi.string(),
    zipcode: jagql.Joi.number(),
    zipcodePlusFour: jagql.Joi.number(),
    cityData: jagql.Joi.one('cityData'),
    stateData: jagql.Joi.one('stateData'),
    updatedBy: jagql.Joi.one('users')
  }
});