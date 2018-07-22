const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "counselee-child-bio-parents",
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
    type: jagql.Joi.string(),
    name: jagql.Joi.string(),
    age: jagql.Joi.number(),
    occupation: jagql.Joi.string(),
    healthProblems: jagql.Joi.string(),
    isDeceased: jagql.Joi.boolean(),
    ageAtDeath: jagql.Joi.number(),
    childAgeWhenBioDied: jagql.Joi.number(),
    causeOfDeath: jagql.Joi.string(),
    counseleeChild: jagql.Joi.one('counselee-child'),
    updatedBy: jagql.Joi.one('users')
  }
});