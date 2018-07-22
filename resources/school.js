jsonApi.define({
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
    name: jsonApi.Joi.string(),
    street: jsonApi.Joi.string(),
    zipcode: jsonApi.Joi.number(),
    zipcodePlusFour: jsonApi.Joi.number(),
    cityData: jsonApi.Joi.one('city-data'),
    stateData: jsonApi.Joi.one('state-data'),
    updatedBy: jsonApi.Joi.one('users'),
    counseleeChildren: jsonApi.Joi.many('counselee-child')
  }
});