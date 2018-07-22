server.define({
  resource: "schools",
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
    street: server.Joi.string(),
    zipcode: server.Joi.number(),
    zipcodePlusFour: server.Joi.number(),
    cityData: server.Joi.one('city-data'),
    stateData: server.Joi.one('state-data'),
    updatedBy: server.Joi.one('users'),
    counseleeChildren: server.Joi.many('counselee-child')
  }
});