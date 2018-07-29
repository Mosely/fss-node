const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");
let sql = new RelationalDbStore({
  dialect: process.env.DB_DRIVER,
  dialectOptions: {
    supportBigNumbers: true
  },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: console.log
});
jagql.define({
  resource: "clients",
  handlers: sql,
  attributes: {
    socialSecurityNumber: jagql.Joi.number(),
    placeOfEmployment: jagql.Joi.string(),
    isServiceMemberOrVeteran: jagql.Joi.boolean(),
    hasFamilyWhoIsServiceMemberOrVeteran: jagql.Joi.boolean(),
    isReferredByVeteranResourceCenter: jagql.Joi.boolean(),
    referral: jagql.Joi.string(),
    updatedBy: jagql.Joi.number().default(1),
    ethnicities: jagql.Joi.many("ethnicities")
  }
});
sql.populate({force: false}, () => {
  //tables dropped and created
});