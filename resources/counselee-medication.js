jsonApi.define({
  resource: "counselee-medications",
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
    reason: jsonApi.Joi.string(),
    counselee: jsonApi.Joi.one('counselee'),
    medication: jsonApi.Joi.one('medication'),
    updatedBy: jsonApi.Joi.one('users')
  }
});