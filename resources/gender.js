const jagql = require("@jagql/framework");
const RelationalDbStore = require("@jagql/store-sequelize");

let theTable = new RelationalDbStore({
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
  resource: "genders",
  handlers: theTable,
  primaryKey: "autoincrement",
  attributes: {
    name: jagql.Joi.string(),
    updatedBy: jagql.Joi.number().default(1)
  }
});

theTable.populate({force: false}, () => {
  //tables dropped and created
});