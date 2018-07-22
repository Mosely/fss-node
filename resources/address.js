server.define({
  resource: "addresses",
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
    streetNumber: server.Joi.number(),
    streetName: server.Joi.string(),
    streetSuffix: server.Joi.string(),
    zipcode: server.Joi.number(),
    zipcodePlusFour: server.Joi.number(),
    apartmentNumber: server.Joi.number(),
    cityData: server.Joi.one('city-data'),
    stateData: server.Joi.one('state-data'),
    countyData: server.Joi.one('county-data'),
    updatedBy: server.Joi.one('users'),
    personAddresses: server.Joi.many('person-address')
  }
});