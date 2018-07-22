server.define({
  resource: "person-addresses",
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
    person: server.Joi.one('person'),
    address: server.Joi.one('address'),
    updatedBy: server.Joi.one('users')
  }
});