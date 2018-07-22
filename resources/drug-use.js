jsonApi.define({
  resource: "drug-uses",
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
    type: jsonApi.Joi.string(),
    updatedBy: jsonApi.Joi.one('users'),
    counseleeDrugUses: jsonApi.Joi.many('counselee-drug-use')
  }
});