jsonApi.define({
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
    usedFormAssistance: jsonApi.Joi.boolean(),
    assistantName: jsonApi.Joi.string(),
    assistantRelationship: jsonApi.Joi.string(),
    isRural: jsonApi.Joi.boolean(),
    isUrban: jsonApi.Joi.boolean(),
    hasTanfForm: jsonApi.Joi.boolean(),
    enterDate: jsonApi.Joi.date(),
    exitDate: jsonApi.Joi.date(),
    notes: jsonApi.Joi.string(),
    advocateUser: jsonApi.Joi.one('advocate-user'),
    updatedBy: jsonApi.Joi.one('users'),
    shelterClientAdditionalStaffs: jsonApi.Joi.many('shelter-client-additional-staff'),
    shelterClientFundingSources: jsonApi.Joi.many('shelter-client-funding-source'),
    shelterClientIdentityPreferences: jsonApi.Joi.many('shelter-client-identity-preference')
  }
});