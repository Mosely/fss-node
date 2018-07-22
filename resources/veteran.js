jsonApi.define({
  resource: "veterans",
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
    referredBy: jsonApi.Joi.string(),
    hasDd214: jsonApi.Joi.boolean(),
    isRegisteredWithVa: jsonApi.Joi.boolean(),
    vaId: jsonApi.Joi.number(),
    jobTitle: jsonApi.Joi.string(),
    isOnDisability: jsonApi.Joi.boolean(),
    isHomeless: jsonApi.Joi.boolean(),
    householdIncome: jsonApi.Joi.number(),
    branchOfService: jsonApi.Joi.one('branch-of-service'),
    militaryDischargeType: jsonApi.Joi.one('military-discharge-type'),
    updatedBy: jsonApi.Joi.one('users')
  }
});