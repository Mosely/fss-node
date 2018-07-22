jsonApi.define({
  resource: "people",
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
    firstName: jsonApi.Joi.string(),
    lastName: jsonApi.Joi.string(),
    middleName: jsonApi.Joi.string(),
    dateOfBirth: jsonApi.Joi.date(),
    age: jsonApi.Joi.number(),
    gender: jsonApi.Joi.one('gender'),
    updatedBy: jsonApi.Joi.one('users'),
    personAddresses: jsonApi.Joi.many('person-address'),
    personPhones: jsonApi.Joi.many('person-phone')
  }
});