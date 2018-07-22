server.define({
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
    firstName: server.Joi.string(),
    lastName: server.Joi.string(),
    middleName: server.Joi.string(),
    dateOfBirth: server.Joi.date(),
    age: server.Joi.number(),
    gender: server.Joi.one('gender'),
    updatedBy: server.Joi.one('users'),
    personAddresses: server.Joi.many('person-address'),
    personPhones: server.Joi.many('person-phone')
  }
});