const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jagql.define({
  resource: "users",
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
    username: jagql.Joi.string(),
    email: jagql.Joi.string(),
    password: jagql.Joi.string(),
    passwordCreatedAt: jagql.Joi.date(),
    isDisabled: jagql.Joi.boolean(),
    updatedBy: jagql.Joi.one('users'),
    shelterClientAdditionalStaffs: jagql.Joi.many('shelter-client-additional-staff'),
    userRoles: jagql.Joi.many('user-role')
  }
});