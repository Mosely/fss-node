server.define({
  resource: "user-views",
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
    genderId: server.Joi.number(),
    gender: server.Joi.string(),
    username: server.Joi.string(),
    password: server.Joi.string(),
    passwordCreatedAt: server.Joi.date(),
    isDisabled: server.Joi.boolean()
  }
});