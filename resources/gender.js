module.exports = function (jagql, sql) {
  jagql.define({
    resource: "genders",
    handlers: sql,
    primaryKey: "autoincrement",
    attributes: {
      name: jagql.Joi.string(),
      updatedBy: jagql.Joi.number().default(1)
    }
  });

  theTable.populate({ force: false }, () => {
    //tables dropped and created
  });
};