jsonApi.define({
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
    relation: jsonApi.Joi.string(),
    criteriaValue: jsonApi.Joi.string(),
    isHidden: jsonApi.Joi.boolean(),
    reportColumn: jsonApi.Joi.one('report-column'),
    updatedBy: jsonApi.Joi.one('users')
  }
});