'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'clients',
    handlers: mainHandler,
    primaryKey: 'uuid',
    searchParams: {
      social_security_number: jagql.Joi.number(),
      place_of_employment: jagql.Joi.string(),
      is_service_member_or_veteran: jagql.Joi.boolean(),
      has_family_who_is_service_member_or_veteran: jagql.Joi.boolean(),
      is_referred_by_veteran_resource_center: jagql.Joi.boolean(),
      referral: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      social_security_number: jagql.Joi.number(),
      place_of_employment: jagql.Joi.string().default('Unemployed'),
      is_service_member_or_veteran: jagql.Joi.boolean(),
      has_family_who_is_service_member_or_veteran: jagql.Joi.boolean(),
      is_referred_by_veteran_resource_center: jagql.Joi.boolean(),
      referral: jagql.Joi.string().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      languages: jagql.Joi.many('languages'),
      ethnicities: jagql.Joi.many('ethnicities')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        