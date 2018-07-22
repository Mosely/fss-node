const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

jagql.define({
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
    schoolProblems: jagql.Joi.string(),
    longStandingIllnesses: jagql.Joi.string(),
    whoElseRaisedChild: jagql.Joi.string(),
    school: jagql.Joi.one('school'),
    updatedBy: jagql.Joi.one('users'),
    counseleeChildBioParents: jagql.Joi.many('counselee-child-bio-parent'),
    counseleeChildGuardians: jagql.Joi.many('counselee-child-guardian'),
    counseleeChildSiblings: jagql.Joi.many('counselee-child-sibling')
  }
});