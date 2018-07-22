jsonApi.define({
  resource: "counselee-child-guardians",
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
    age: jsonApi.Joi.number(),
    occupation: jsonApi.Joi.string(),
    isCurrentlyLivingWithChild: jsonApi.Joi.boolean(),
    dateFirstLivedWithChild: jsonApi.Joi.date(),
    counseleeChild: jsonApi.Joi.one('counselee-child'),
    updatedBy: jsonApi.Joi.one('users')
  }
});