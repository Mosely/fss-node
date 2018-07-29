module.exports = function (jagql, sqlConfig) {
  let sql = require("@jagql/store-sequelize");
  sql = new sql(sqlConfig);
  jagql.define({
    resource: "languages",
    handlers: sql,
    primaryKey: "autoincrement",
    attributes: {
      name: jagql.Joi.string(),
      updatedBy: jagql.Joi.number().default(1),
      clients: jagql.Joi.belongsToMany({
        resource: 'clients',
        as: 'languages'
      })
    }
  });
  sql.populate({ force: false }, () => {
    //tables dropped and created
});
};