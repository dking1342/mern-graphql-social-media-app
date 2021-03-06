import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;


export const vaildateRegisterInput = (username,email,password,confirmPassword) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address'
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }
    return {
        errors,
        valid:Object.keys(errors).length < 1
    }
}

export const validateLoginInput = (username,password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }
    if(password.trim() === ''){
        errors.password = 'Password must not be empty'
    }
    return {
        errors,
        valid:Object.keys(errors).length < 1
    }
}

export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email:user.email,
        username:user.username
    }, ACCESS_TOKEN, { expiresIn: '1hr'});
};