require('dotenv').config();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.connection_string);
db.then(() =>{
  console.log("connection success");
}).catch((e)=>{
  console.error("Error !",e);
});

module.exports = db