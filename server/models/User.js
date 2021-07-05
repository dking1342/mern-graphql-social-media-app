import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

const User = mongoose.model('User',UserSchema);
export default User;