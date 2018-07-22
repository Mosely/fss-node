server.define({
  resource: "shelter-clients",
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
    usedFormAssistance: server.Joi.boolean(),
    assistantName: server.Joi.string(),
    assistantRelationship: server.Joi.string(),
    isRural: server.Joi.boolean(),
    isUrban: server.Joi.boolean(),
    hasTanfForm: server.Joi.boolean(),
    enterDate: server.Joi.date(),
    exitDate: server.Joi.date(),
    notes: server.Joi.string(),
    advocateUser: server.Joi.one('advocate-user'),
    updatedBy: server.Joi.one('users'),
    shelterClientAdditionalStaffs: server.Joi.many('shelter-client-additional-staff'),
    shelterClientFundingSources: server.Joi.many('shelter-client-funding-source'),
    shelterClientIdentityPreferences: server.Joi.many('shelter-client-identity-preference')
  }
});