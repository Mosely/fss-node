server.define({
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
    name: server.Joi.string(),
    age: server.Joi.number(),
    occupation: server.Joi.string(),
    isCurrentlyLivingWithChild: server.Joi.boolean(),
    dateFirstLivedWithChild: server.Joi.date(),
    counseleeChild: server.Joi.one('counselee-child'),
    updatedBy: server.Joi.one('users')
  }
});