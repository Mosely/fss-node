server.define({
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
    socialSecurityNumber: server.Joi.number(),
    placeOfEmployment: server.Joi.string(),
    isServiceMemberOrVeteran: server.Joi.boolean(),
    hasFamilyWhoIsServiceMemberOrVeteran: server.Joi.boolean(),
    isReferredByVeteranResourceCenter: server.Joi.boolean(),
    referral: server.Joi.string(),
    updatedBy: server.Joi.one('users'),
    clientEthnicities: server.Joi.many('client-ethnicity'),
    clientLanguages: server.Joi.many('client-language')
  }
});