server.define({
  resource: "city-data-extendeds",
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
    zip: server.Joi.number(),
    latitude: server.Joi.number(),
    longitude: server.Joi.number(),
    county: server.Joi.string(),
    city: server.Joi.one('c'),
    stateCode: server.Joi.one('state-c'),
    updatedBy: server.Joi.one('users')
  }
});