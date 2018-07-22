jsonApi.define({
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
    streetNumber: jsonApi.Joi.number(),
    streetName: jsonApi.Joi.string(),
    streetSuffix: jsonApi.Joi.string(),
    zipcode: jsonApi.Joi.number(),
    zipcodePlusFour: jsonApi.Joi.number(),
    apartmentNumber: jsonApi.Joi.number(),
    cityData: jsonApi.Joi.one('city-data'),
    stateData: jsonApi.Joi.one('state-data'),
    countyData: jsonApi.Joi.one('county-data'),
    updatedBy: jsonApi.Joi.one('users'),
    personAddresses: jsonApi.Joi.many('person-address')
  }
});