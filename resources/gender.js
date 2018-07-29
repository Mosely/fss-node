module.exports = function (jagql, sqlConfig) {
  let sql  = require("@jagql/store-sequelize")(sqlConfig);
  jagql.define({
    resource: "genders",
    handlers: sql,
    primaryKey: "autoincrement",
    attributes: {
      name: jagql.Joi.string(),
      updatedBy: jagql.Joi.number().default(1)
    }
  });
  sql.populate({ force: false }, () => {
    //tables dropped and created
});
};