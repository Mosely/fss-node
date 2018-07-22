jsonApi.define({
  resource: "report-columns",
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
    header: jsonApi.Joi.string(),
    tableName: jsonApi.Joi.string(),
    columnName: jsonApi.Joi.string(),
    columnOrder: jsonApi.Joi.number(),
    width: jsonApi.Joi.number(),
    report: jsonApi.Joi.one('report'),
    updatedBy: jsonApi.Joi.one('users'),
    reportCriterias: jsonApi.Joi.many('report-criteria')
  }
});