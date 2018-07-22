jsonApi.define({
  resource: "shelter-client-additional-staffs",
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
  
    shelterClient: jsonApi.Joi.one('shelter-client'),
    user: jsonApi.Joi.one('user'),
    updatedBy: jsonApi.Joi.one('users')
  }
});