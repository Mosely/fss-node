const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "counseleedruguses",
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
    ageWhenFirstUsed: jagql.Joi.number(),
    counselee: jagql.Joi.one('counselee'),
    drugUse: jagql.Joi.one('drug-use'),
    updatedBy: jagql.Joi.one('users')
  }
});