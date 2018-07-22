const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "user-views",
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
    genderId: jagql.Joi.number(),
    gender: jagql.Joi.string(),
    username: jagql.Joi.string(),
    password: jagql.Joi.string(),
    passwordCreatedAt: jagql.Joi.date(),
    isDisabled: jagql.Joi.boolean()
  }
});