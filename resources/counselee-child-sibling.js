const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "counseleeChildSiblings",
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
    type: jagql.Joi.string(),
    age: jagql.Joi.number(),
    relationshipDesc: jagql.Joi.string(),
    isDead: jagql.Joi.boolean(),
    ageAtDeath: jagql.Joi.number(),
    counseleeChild: jagql.Joi.one('counseleeChildren'),
    gender: jagql.Joi.one('genders'),
    updatedBy: jagql.Joi.one('users')
  }
});