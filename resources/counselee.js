server.define({
  resource: "counselees",
  handlers: new RelationalDbStore({
    dialect: process.env.DB_DRIVER,
    dialectOptions: {
      supportBigNumbers: true
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: process.env.DEBUG
  }),
  attributes: {
    hasBeenAbused: server.Joi.boolean(),
    abusedByWhom: server.Joi.string(),
    abusedCount: server.Joi.number(),
    seriousProblemsInFamily: server.Joi.boolean(),
    seriousFamilyProblemsDesc: server.Joi.string(),
    alcoholProblem: server.Joi.boolean(),
    hadBlackOut: server.Joi.boolean(),
    blackOutLocation: server.Joi.string(),
    blackOutDate: server.Joi.date(),
    familyDrugAlcoholProblem: server.Joi.string(),
    familyDrugProblemOtherDetail: server.Joi.string(),
    currentHarmSelf: server.Joi.boolean(),
    pastHarmSelf: server.Joi.boolean(),
    currentHarmOthers: server.Joi.boolean(),
    pastHarmOthers: server.Joi.boolean(),
    currentHarmSelfExample: server.Joi.string(),
    pastHarmSelfExample: server.Joi.string(),
    currentHarmOthersExample: server.Joi.string(),
    pastHarmOthersExample: server.Joi.string(),
    hadPreviousCounseling: server.Joi.boolean(),
    previousCounselingWhere: server.Joi.string(),
    previousCounselingWhen: server.Joi.date(),
    currentlyInCounseling: server.Joi.boolean(),
    currentCounselor: server.Joi.string(),
    updatedBy: server.Joi.one('users'),
    counseleeCounselingTopics: server.Joi.many('counselee-counseling-topic'),
    counseleeDrugUses: server.Joi.many('counselee-drug-use'),
    counseleeMedications: server.Joi.many('counselee-medication')
  }
});