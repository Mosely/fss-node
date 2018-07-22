server.define({
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
    type: server.Joi.string(),
    name: server.Joi.string(),
    age: server.Joi.number(),
    occupation: server.Joi.string(),
    healthProblems: server.Joi.string(),
    isDeceased: server.Joi.boolean(),
    ageAtDeath: server.Joi.number(),
    childAgeWhenBioDied: server.Joi.number(),
    causeOfDeath: server.Joi.string(),
    counseleeChild: server.Joi.one('counselee-child'),
    updatedBy: server.Joi.one('users')
  }
});