server.define({
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
    areaCode: server.Joi.number(),
    phoneNumber: server.Joi.number(),
    extension: server.Joi.number(),
    phoneType: server.Joi.string(),
    updatedBy: server.Joi.one('users'),
    personPhones: server.Joi.many('person-phone')
  }
});