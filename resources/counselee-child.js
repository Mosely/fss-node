jsonApi.define({
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
    schoolProblems: jsonApi.Joi.string(),
    longStandingIllnesses: jsonApi.Joi.string(),
    whoElseRaisedChild: jsonApi.Joi.string(),
    school: jsonApi.Joi.one('school'),
    updatedBy: jsonApi.Joi.one('users'),
    counseleeChildBioParents: jsonApi.Joi.many('counselee-child-bio-parent'),
    counseleeChildGuardians: jsonApi.Joi.many('counselee-child-guardian'),
    counseleeChildSiblings: jsonApi.Joi.many('counselee-child-sibling')
  }
});