jsonApi.define({
  resource: "counselee-drug-uses",
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
    ageWhenFirstUsed: jsonApi.Joi.number(),
    counselee: jsonApi.Joi.one('counselee'),
    drugUse: jsonApi.Joi.one('drug-use'),
    updatedBy: jsonApi.Joi.one('users')
  }
});