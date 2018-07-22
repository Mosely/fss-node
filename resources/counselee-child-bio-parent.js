jsonApi.define({
  resource: "counselee-child-bio-parents",
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
    type: jsonApi.Joi.string(),
    name: jsonApi.Joi.string(),
    age: jsonApi.Joi.number(),
    occupation: jsonApi.Joi.string(),
    healthProblems: jsonApi.Joi.string(),
    isDeceased: jsonApi.Joi.boolean(),
    ageAtDeath: jsonApi.Joi.number(),
    childAgeWhenBioDied: jsonApi.Joi.number(),
    causeOfDeath: jsonApi.Joi.string(),
    counseleeChild: jsonApi.Joi.one('counselee-child'),
    updatedBy: jsonApi.Joi.one('users')
  }
});