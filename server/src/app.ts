import express ,{Application}from 'express';
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/dbconnection';
import userRouter from './routes/user/userRouter'
const cookieParser = require('cookie-parser');

//variables
const port = process.env.PORT || 3001
const DATABASE_URL : string | undefined = process.env.DATABASE_URL
const app:Application = express();
(async  () => {
await connectDb(String(DATABASE_URL))

})()

//middlewares
app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true,
}))
app.use(logger("dev"))
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static("public"));
// app.use(cookieParser());
app.use(cookieParser());


//routes

app.use('/',userRouter)




app.listen(port,()=>{
    console.log(`server listening at ${port}`);
});

export default app