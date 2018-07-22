const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "personphones",
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
    isPrimary: jagql.Joi.boolean(),
    canCall: jagql.Joi.boolean(),
    person: jagql.Joi.one('person'),
    phone: jagql.Joi.one('phone'),
    updatedBy: jagql.Joi.one('users')
  }
});