'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'counselee_child_siblings',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      relation: jagql.Joi.string().valid(
        ['NATURAL', 'HALF', 'STEP']
      ),
      age: jagql.Joi.number(),
      relationship_desc: jagql.Joi.string(),
      is_dead: jagql.Joi.boolean(),
      age_at_death: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      relation: jagql.Joi.string().valid(
        ['NATURAL', 'HALF', 'STEP']
      ),
      age: jagql.Joi.number(),
      relationship_desc: jagql.Joi.string(),
      is_dead: jagql.Joi.boolean(),
      age_at_death: jagql.Joi.number(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      counselee_child: jagql.Joi.belongsToOne('counselee_children'),
      gender: jagql.Joi.one('genders')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        