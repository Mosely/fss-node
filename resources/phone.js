const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "phones",
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
    areaCode: jagql.Joi.number(),
    phoneNumber: jagql.Joi.number(),
    extension: jagql.Joi.number(),
    phoneType: jagql.Joi.string(),
    updatedBy: jagql.Joi.one('users'),
    personPhones: jagql.Joi.many('person-phone')
  }
});