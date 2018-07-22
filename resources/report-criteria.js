server.define({
  resource: "report-criterias",
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
    relation: server.Joi.string(),
    criteriaValue: server.Joi.string(),
    isHidden: server.Joi.boolean(),
    reportColumn: server.Joi.one('report-column'),
    updatedBy: server.Joi.one('users')
  }
});