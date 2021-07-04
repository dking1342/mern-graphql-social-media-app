import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectdb from './config/mongodb.js';

// dotenv init
dotenv.config();

// mongodb init
connectdb();

// express middleware
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// server init
app.listen(PORT,()=> console.log(`Server listening on ${PORT}...`));