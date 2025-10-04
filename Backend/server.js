import app from "./src/app.js"
import db from "./src/config/db.js";
import dotenv from "dotenv"
dotenv.config();

//routes


//db connection
db.connect(err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});



app.listen(3000,()=>{
   console.log('connected to server')
})