jsonApi.define({
  resource: "city-datas",
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
    updatedBy: jsonApi.Joi.one('users'),
    addresses: jsonApi.Joi.many('address'),
    schools: jsonApi.Joi.many('school')
  }
});