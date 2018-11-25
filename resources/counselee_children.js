'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'counselee_children',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      //school_id: jagql.Joi.number(),
      school_problems: jagql.Joi.string(),
      long_standing_illnesses: jagql.Joi.string(),
      who_else_raised_child: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      //school_id: jagql.Joi.number(),
      school_problems: jagql.Joi.string().allow(null),
      long_standing_illnesses: jagql.Joi.string().allow(null),
      who_else_raised_child: jagql.Joi.string().allow(null),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      school: jagql.Joi.one('schools'),
      siblings: jagql.Joi.many('siblings'),
      guardians: jagql.Joi.many('guardians'),
      bio_parents: jagql.Joi.many('bio_parents')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        