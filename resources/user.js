jsonApi.define({
  resource: "users",
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
    username: jsonApi.Joi.string(),
    email: jsonApi.Joi.string(),
    password: jsonApi.Joi.string(),
    passwordCreatedAt: jsonApi.Joi.date(),
    isDisabled: jsonApi.Joi.boolean(),
    updatedBy: jsonApi.Joi.one('users'),
    shelterClientAdditionalStaffs: jsonApi.Joi.many('shelter-client-additional-staff'),
    userRoles: jsonApi.Joi.many('user-role')
  }
});