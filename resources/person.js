module.exports = function (jagql, sql) {
  jagql.define({
    resource: "people",
    handlers: sql,
    primaryKey: "autoincrement",
    attributes: {
      firstName: jagql.Joi.string(),
      lastName: jagql.Joi.string(),
      middleName: jagql.Joi.string(),
      dateOfBirth: jagql.Joi.date(),
      age: jagql.Joi.number(),
      gender: jagql.Joi.one('genders'),
      updatedBy: jagql.Joi.number().default(1),
      client: jagql.Joi.one("clients")
    }
  });
};