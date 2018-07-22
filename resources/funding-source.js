jsonApi.define({
  resource: "funding-sources",
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
    name: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    updatedBy: jsonApi.Joi.one('users'),
    shelterClientFundingSources: jsonApi.Joi.many('shelter-client-funding-source')
  }
});