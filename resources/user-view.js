jsonApi.define({
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
    firstName: jsonApi.Joi.string(),
    lastName: jsonApi.Joi.string(),
    middleName: jsonApi.Joi.string(),
    dateOfBirth: jsonApi.Joi.date(),
    age: jsonApi.Joi.number(),
    genderId: jsonApi.Joi.number(),
    gender: jsonApi.Joi.string(),
    username: jsonApi.Joi.string(),
    password: jsonApi.Joi.string(),
    passwordCreatedAt: jsonApi.Joi.date(),
    isDisabled: jsonApi.Joi.boolean(
  }
});