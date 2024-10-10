import  express from "express"
import cors from 'cors'
import {Book} from './models/bookModel.js'
import {PORT,mongoDBURL} from './config.js';
import mongoose from 'mongoose'
import bookRouter from './routes/bookRoute.js'
const app=express();
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
//2. allowa custom origins
// app.use(
//   cors({
//     origin: "http://localhost:5000/",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
//   })
// );

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Get Method")
})

app.use('/books',bookRouter);


//-----------deployement

const _dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running succefully");
  });
}




mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database")
    app.listen(PORT, () => {
      console.log(`App is listening to PORT ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error)
})

