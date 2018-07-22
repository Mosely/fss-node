jsonApi.define({
  resource: "person-phones",
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
    isPrimary: jsonApi.Joi.boolean(),
    canCall: jsonApi.Joi.boolean(),
    person: jsonApi.Joi.one('person'),
    phone: jsonApi.Joi.one('phone'),
    updatedBy: jsonApi.Joi.one('users')
  }
});