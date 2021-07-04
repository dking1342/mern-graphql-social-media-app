import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const conn = process.env.MONGO_URI;
const options = {
    
}

const connectdb = () => mongoose.connect(conn,options);
export default connectdb;