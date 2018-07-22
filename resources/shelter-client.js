const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
  resource: "shelterclients",
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
    usedFormAssistance: jagql.Joi.boolean(),
    assistantName: jagql.Joi.string(),
    assistantRelationship: jagql.Joi.string(),
    isRural: jagql.Joi.boolean(),
    isUrban: jagql.Joi.boolean(),
    hasTanfForm: jagql.Joi.boolean(),
    enterDate: jagql.Joi.date(),
    exitDate: jagql.Joi.date(),
    notes: jagql.Joi.string(),
    advocateUser: jagql.Joi.one('advocate-user'),
    updatedBy: jagql.Joi.one('users'),
    shelterClientAdditionalStaffs: jagql.Joi.many('shelter-client-additional-staff'),
    shelterClientFundingSources: jagql.Joi.many('shelter-client-funding-source'),
    shelterClientIdentityPreferences: jagql.Joi.many('shelter-client-identity-preference')
  }
});