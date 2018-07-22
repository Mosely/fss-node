jsonApi.define({
  resource: "phones",
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
    areaCode: jsonApi.Joi.number(),
    phoneNumber: jsonApi.Joi.number(),
    extension: jsonApi.Joi.number(),
    phoneType: jsonApi.Joi.string(),
    updatedBy: jsonApi.Joi.one('users'),
    personPhones: jsonApi.Joi.many('person-phone')
  }
});