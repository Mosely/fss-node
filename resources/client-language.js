const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "clientLanguages",
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
    isPrimary: jagql.Joi.boolean(),
    otherNote: jagql.Joi.string(),
    client: jagql.Joi.one('clients'),
    language: jagql.Joi.one('languages'),
    updatedBy: jagql.Joi.one('users')
  }
});