import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const conn = process.env.MONGO_URI;
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

const connectdb = () => mongoose.connect(conn,options);
export default connectdb;