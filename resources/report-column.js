server.define({
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
    header: server.Joi.string(),
    tableName: server.Joi.string(),
    columnName: server.Joi.string(),
    columnOrder: server.Joi.number(),
    width: server.Joi.number(),
    report: server.Joi.one('report'),
    updatedBy: server.Joi.one('users'),
    reportCriterias: server.Joi.many('report-criteria')
  }
});