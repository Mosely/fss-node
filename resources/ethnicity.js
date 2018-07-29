const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");
let sql = new RelationalDbStore({
  dialect: process.env.DB_DRIVER,
  dialectOptions: {
    supportBigNumbers: true
  },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: console.log
});
jagql.define({
  resource: "ethnicities",
  handlers: sql,
  attributes: {
    name: jagql.Joi.string(),
    updatedBy: jagql.Joi.number().default(1),
    clients: jagql.joi.belongsToMany({resource:"clients"})
  }
});
sql.populate({force: false}, () => {
  //tables dropped and created
});