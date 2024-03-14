import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mong from 'mongoose';
import dotenv from 'dotenv'
import auth from './Routes/auth'
import invoice from './Routes/invoices'
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth',auth);
app.use('/api/invoice',invoice);

const DB = process.env.MongoDB_URL || ""
app.listen(process.env.PORT,()=>{
  mong.connect(DB).then(()=>{
    console.log('Connected to DB')
    console.log(`Server is running at http://localhost:${process.env.PORT}`)  
  })
})