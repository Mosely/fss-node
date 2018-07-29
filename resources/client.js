module.exports = function(jagql, sql) {
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
  sql.populate({ force: false }, () => {
    //tables dropped and created
  });
};