server.define({
  resource: "counselee-childs",
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
    schoolProblems: server.Joi.string(),
    longStandingIllnesses: server.Joi.string(),
    whoElseRaisedChild: server.Joi.string(),
    school: server.Joi.one('school'),
    updatedBy: server.Joi.one('users'),
    counseleeChildBioParents: server.Joi.many('counselee-child-bio-parent'),
    counseleeChildGuardians: server.Joi.many('counselee-child-guardian'),
    counseleeChildSiblings: server.Joi.many('counselee-child-sibling')
  }
});