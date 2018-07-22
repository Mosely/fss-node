const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

jagql.define({
  resource: "clients",
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
    socialSecurityNumber: jagql.Joi.number(),
    placeOfEmployment: jagql.Joi.string(),
    isServiceMemberOrVeteran: jagql.Joi.boolean(),
    hasFamilyWhoIsServiceMemberOrVeteran: jagql.Joi.boolean(),
    isReferredByVeteranResourceCenter: jagql.Joi.boolean(),
    referral: jagql.Joi.string(),
    updatedBy: jagql.Joi.one('users'),
    clientEthnicities: jagql.Joi.many('client-ethnicity'),
    clientLanguages: jagql.Joi.many('client-language')
  }
});