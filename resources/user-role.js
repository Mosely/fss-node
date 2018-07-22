jsonApi.define({
  resource: "user-roles",
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
  
    user: jsonApi.Joi.one('user'),
    role: jsonApi.Joi.one('role'),
    updatedBy: jsonApi.Joi.one('users')
  }
});