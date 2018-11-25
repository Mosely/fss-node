'use strict';
module.exports = function (jagql, handlerConfig) {
  let Handler = require('@jagql/store-sequelize');
  let mainHandler = new Handler(handlerConfig);
  jagql.define({
    resource: 'counselees',
    handlers: mainHandler,
    primaryKey: 'autoincrement',
    searchParams: {
      has_been_abused: jagql.Joi.boolean(),
      abused_by_whom: jagql.Joi.string(),
      abused_count: jagql.Joi.number(),
      serious_problems_in_family: jagql.Joi.number(),
      serious_family_problems_desc: jagql.Joi.string(),
      alcohol_problem: jagql.Joi.number(),
      had_black_out: jagql.Joi.number(),
      black_out_location: jagql.Joi.string(),
      black_out_date: jagql.Joi.date().timestamp('unix'),
      family_drug_alcohol_problem: jagql.Joi.string(),
      family_drug_problem_other_detail: jagql.Joi.string(),
      current_harm_self: jagql.Joi.number(),
      past_harm_self: jagql.Joi.number(),
      current_harm_others: jagql.Joi.number(),
      past_harm_others: jagql.Joi.number(),
      current_harm_self_example: jagql.Joi.string(),
      past_harm_self_example: jagql.Joi.string(),
      current_harm_others_example: jagql.Joi.string(),
      past_harm_others_example: jagql.Joi.string(),
      had_previous_counseling: jagql.Joi.number(),
      previous_counseling_where: jagql.Joi.string(),
      previous_counseling_when: jagql.Joi.date().timestamp('unix'),
      currently_in_counseling: jagql.Joi.number(),
      current_counselor: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix'),
      updated_at: jagql.Joi.date().timestamp('unix'),
      updated_by: jagql.Joi.number()
    },
    attributes: {
      has_been_abused: jagql.Joi.boolean(),
      abused_by_whom: jagql.Joi.string(),
      abused_count: jagql.Joi.number(),
      serious_problems_in_family: jagql.Joi.number(),
      serious_family_problems_desc: jagql.Joi.string(),
      alcohol_problem: jagql.Joi.number(),
      had_black_out: jagql.Joi.number(),
      black_out_location: jagql.Joi.string(),
      black_out_date: jagql.Joi.date().timestamp('unix'),
      family_drug_alcohol_problem: jagql.Joi.string(),
      family_drug_problem_other_detail: jagql.Joi.string(),
      current_harm_self: jagql.Joi.number(),
      past_harm_self: jagql.Joi.number(),
      current_harm_others: jagql.Joi.number(),
      past_harm_others: jagql.Joi.number(),
      current_harm_self_example: jagql.Joi.string(),
      past_harm_self_example: jagql.Joi.string(),
      current_harm_others_example: jagql.Joi.string(),
      past_harm_others_example: jagql.Joi.string(),
      had_previous_counseling: jagql.Joi.number(),
      previous_counseling_where: jagql.Joi.string(),
      previous_counseling_when: jagql.Joi.date().timestamp('unix'),
      currently_in_counseling: jagql.Joi.number(),
      current_counselor: jagql.Joi.string(),
      created_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_at: jagql.Joi.date().timestamp('unix').default(Math.round(Date.now() / 1000)),
      updated_by: jagql.Joi.number().default(1),
      medications: jagql.Joi.many('medications'),
      drug_uses: jagql.Joi.many('drug_uses'),
      counseling_topics: jagql.Joi.many('counseling_topics')
      
    }
  });
  mainHandler.populate({ force: process.env.FORCE_TABLE_GEN }, () => {
    //tables dropped and created
  });
};
        