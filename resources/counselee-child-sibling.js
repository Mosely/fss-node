server.define({
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
    type: server.Joi.string(),
    age: server.Joi.number(),
    relationshipDesc: server.Joi.string(),
    isDead: server.Joi.boolean(),
    ageAtDeath: server.Joi.number(),
    counseleeChild: server.Joi.one('counselee-child'),
    gender: server.Joi.one('gender'),
    updatedBy: server.Joi.one('users')
  }
});