server.define({
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
    type: server.Joi.string(),
    updatedBy: server.Joi.one('users'),
    counseleeDrugUses: server.Joi.many('counselee-drug-use')
  }
});