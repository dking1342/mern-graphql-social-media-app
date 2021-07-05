import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;

export const isAuth = (context) => {
    const auth = {}
    const errors = {};
    const authorization = context.req.headers.authorization;
    if(authorization){
        const token = authorization.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, ACCESS_TOKEN);
                auth.data = user;
            } catch (error) {
                errors.general = 'Invalid/Expired token';
            }
        } else {
            errors.general = 'Authentication token must be formatted correctly';
        }
    } else {
        errors.general = 'Correct header must be provided';
    }

    return{
        auth,
        errors,
        valid: Object.keys(errors) < 1,
        authValid: Object.keys(auth) < 1
    }
}

