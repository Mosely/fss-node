jsonApi.define({
  resource: "counselee-child-siblings",
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
    age: jsonApi.Joi.number(),
    relationshipDesc: jsonApi.Joi.string(),
    isDead: jsonApi.Joi.boolean(),
    ageAtDeath: jsonApi.Joi.number(),
    counseleeChild: jsonApi.Joi.one('counselee-child'),
    gender: jsonApi.Joi.one('gender'),
    updatedBy: jsonApi.Joi.one('users')
  }
});