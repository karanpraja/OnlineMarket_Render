require('dotenv')
const server = require('.');
const connectDb = require('./config/Database');

const PORT = process.env.PORT || 8000;
 

connectDb();
server.get("/", (req, res) => {
  res.json("server working");
});
// server.post("/products",createProduct );
server.listen(PORT, () => {
  console.log(" server working");
});