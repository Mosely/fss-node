jsonApi.define({
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
    socialSecurityNumber: jsonApi.Joi.number(),
    placeOfEmployment: jsonApi.Joi.string(),
    isServiceMemberOrVeteran: jsonApi.Joi.boolean(),
    hasFamilyWhoIsServiceMemberOrVeteran: jsonApi.Joi.boolean(),
    isReferredByVeteranResourceCenter: jsonApi.Joi.boolean(),
    referral: jsonApi.Joi.string(),
    updatedBy: jsonApi.Joi.one('users'),
    clientEthnicities: jsonApi.Joi.many('client-ethnicity'),
    clientLanguages: jsonApi.Joi.many('client-language')
  }
});