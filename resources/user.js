server.define({
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
    username: server.Joi.string(),
    email: server.Joi.string(),
    password: server.Joi.string(),
    passwordCreatedAt: server.Joi.date(),
    isDisabled: server.Joi.boolean(),
    updatedBy: server.Joi.one('users'),
    shelterClientAdditionalStaffs: server.Joi.many('shelter-client-additional-staff'),
    userRoles: server.Joi.many('user-role')
  }
});