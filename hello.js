const dotenv=require('dotenv').config();

console.log(process.env.key_id);
console.log(JSON.stringify(process.env.key_secret));