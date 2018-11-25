'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'bio_parents',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      relation: jagql.Joi.string().valid(['MOTHER', 'FATHER']),
      name: jagql.Joi.string(),
      age: jagql.Joi.number(),
      occupation: jagql.Joi.string().default('Unemployed'),
      is_currently_living_with_child: jagql.Joi.boolean(),
      date_first_lived_with_child: jagql.Joi.date().timestamp('unix'),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      relation: jagql.Joi.string().valid(['MOTHER', 'FATHER']),
      name: jagql.Joi.string(),
      age: jagql.Joi.number(),
      occupation: jagql.Joi.string().default('Unemployed'),
      health_problems: jagql.Joi.string().allow(null),
      is_deceased: jagql.Joi.boolean().default(false),
      age_at_death: jagql.Joi.number().allow(null),
      child_age_when_bio_died: jagql.Joi.number().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      counselee_child: jagql.Joi.belongsToOne({ resource: 'counselee_children', as: 'bio_parents' }),
      gender: jagql.Joi.one('genders')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        