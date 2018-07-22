server.define({
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
    referredBy: server.Joi.string(),
    hasDd214: server.Joi.boolean(),
    isRegisteredWithVa: server.Joi.boolean(),
    vaId: server.Joi.number(),
    jobTitle: server.Joi.string(),
    isOnDisability: server.Joi.boolean(),
    isHomeless: server.Joi.boolean(),
    householdIncome: server.Joi.number(),
    branchOfService: server.Joi.one('branch-of-service'),
    militaryDischargeType: server.Joi.one('military-discharge-type'),
    updatedBy: server.Joi.one('users')
  }
});