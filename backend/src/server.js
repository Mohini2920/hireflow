
import connectDB from "./db/index.js";
import  app  from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
console.log("server is running on port : ", PORT);
connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port : ${PORT}`);
        
    })
})
.catch((err)=>{
  console.log("MONGO DB CONNECTION FAILED!!!!",err);
  process.exit(1);
});

