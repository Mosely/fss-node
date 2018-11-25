'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'veterans',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      referred_by: jagql.Joi.string(),
      //branch_of_service_id: jagql.Joi.number(),
      //military_discharge_type_id: jagql.Joi.number(),
      has_dd214: jagql.Joi.boolean(),
      is_registered_with_va: jagql.Joi.boolean(),
      va_id: jagql.Joi.number(),
      job_title: jagql.Joi.string(),
      is_on_disability: jagql.Joi.boolean(),
      is_homeless: jagql.Joi.boolean(),
      household_income: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      referred_by: jagql.Joi.string(),
      branch_of_service_id: jagql.Joi.number(),
      military_discharge_type_id: jagql.Joi.number(),
      has_dd214: jagql.Joi.boolean(),
      is_registered_with_va: jagql.Joi.boolean(),
      va_id: jagql.Joi.number(),
      job_title: jagql.Joi.string().allow(null),
      is_on_disability: jagql.Joi.boolean(),
      is_homeless: jagql.Joi.boolean(),
      household_income: jagql.Joi.number().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      branch_of_service: jagql.Joi.one('branches_of_service'),
      military_discharge_type: jagql.Joi.one('military_discharge_types')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        