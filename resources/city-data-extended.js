jsonApi.define({
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
    zip: jsonApi.Joi.number(),
    latitude: jsonApi.Joi.number(),
    longitude: jsonApi.Joi.number(),
    county: jsonApi.Joi.string(),
    city: jsonApi.Joi.one('c'),
    stateCode: jsonApi.Joi.one('state-c'),
    updatedBy: jsonApi.Joi.one('users')
  }
});