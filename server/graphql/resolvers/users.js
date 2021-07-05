
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server'; 

import User from '../../models/User.js';
import { vaildateRegisterInput, validateLoginInput, generateToken } from '../../utils/validations.js';


const users = {
    Mutation:{
        async login(_,{ username, password }){
            try {
                const { errors, valid } = validateLoginInput(username, password);

                // checks to see if there is any user errors
                if(!valid){
                    return new UserInputError('Errors', { errors });
                }

                // checks if the user is there from the db
                const user = await User.findOne({username});
                if(!user){
                    errors.general = 'User not found';
                    return new UserInputError('User not found', { errors });
                }

                // checks to see if the passwords match
                const match = await bcrypt.compare(password,user.password);
                if(!match){
                    errors.general = 'Wrong credentials'
                    return new UserInputError('Wrong credentials', { errors });
                }

                // creates a token
                const token = generateToken(user);
    
                return {
                    ...user._doc,
                    id:user._id,
                    token
                }
            } catch (error) {
                return error.message
            }
        },
        async register(_,{ registerInput: { username, email,password,confirmPassword} }){
            try {
                // checks to see if user already exists in the db
                const user = await User.findOne({username});
                if(user){
                    return new UserInputError('Username is taken',{
                        error:{
                            username:'This username is taken'
                        }
                    })
                } 

                const { valid, errors } = vaildateRegisterInput(username,email,password,confirmPassword)

                // checks if there are any errors made by the user during registration
                if(!valid){
                    return new UserInputError('Errors', { errors });
                }
                
                // creates a hashed password
                password = await bcrypt.hash(password,12);

                // creates new user and saves it to the db
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                });
                const res = await newUser.save();

                // creates a new token for the user
                const token = generateToken(res);

                return {
                    ...res._doc,
                    id:res._id,
                    token
                }
            } catch (error) {
                return error.message
            }
        }
    }
}

export default users;