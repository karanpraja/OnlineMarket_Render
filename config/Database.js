require('dotenv')
const mongoose=require("mongoose")
connectDb().catch((error) => console.log(error));
async function connectDb() {
  await mongoose.connect(process.env.MONGO_URL); 
  console.log("database connected!");
}
// exports.connectDb;
module.exports=connectDb;