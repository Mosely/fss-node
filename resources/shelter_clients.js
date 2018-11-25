'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'shelter_clients',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      used_form_assistance: jagql.Joi.number(),
      assistant_name: jagql.Joi.string(),
      assistant_relationship: jagql.Joi.string(),
      is_rural: jagql.Joi.boolean(),
      is_urban: jagql.Joi.boolean(),
      has_tanf_form: jagql.Joi.boolean(),
      //advocate_user_id: jagql.Joi.number(),
      enter_date: jagql.Joi.date().timestamp('unix'),
      exit_date: jagql.Joi.date().timestamp('unix'),
      notes: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      used_form_assistance: jagql.Joi.number(),
      assistant_name: jagql.Joi.string(),
      assistant_relationship: jagql.Joi.string(),
      is_rural: jagql.Joi.boolean(),
      is_urban: jagql.Joi.boolean(),
      has_tanf_form: jagql.Joi.boolean(),
      //advocate_user_id: jagql.Joi.number(),
      enter_date: jagql.Joi.date().timestamp('unix'),
      exit_date: jagql.Joi.date().timestamp('unix'),
      notes: jagql.Joi.string().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      identity_preferences: jagql.Joi.many('identity_preferences'),
      funding_sources: jagql.Joi.many('funding_sources'),
      additional_staff: jagql.Joi.many('users'),
      advocate_user: jagql.Joi.one('users')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        