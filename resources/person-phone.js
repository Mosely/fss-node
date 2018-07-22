server.define({
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
    isPrimary: server.Joi.boolean(),
    canCall: server.Joi.boolean(),
    person: server.Joi.one('person'),
    phone: server.Joi.one('phone'),
    updatedBy: server.Joi.one('users')
  }
});