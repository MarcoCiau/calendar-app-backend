/*
hash password
compare password
generate JWT
validate JWT
*/
import bcrypt from 'bcrypt';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import config from '../config/config';

const generateJWT = async (userId: string, privateKey: string, expires: string) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({ userId }, privateKey, { expiresIn: expires }, function (error, token = '') {
            if (error) {
                reject(error);
            }
            if (!token) {
                reject(null)
            }
            resolve(token);
        });
    })
};

const verifyJWT = (token: string, privateKey: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, function (err: VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) {
            if (err) {
                console.log("Verify Token Error: ", err);
                reject(err);
            }
            resolve(decoded);
        });
    })
};

export const hashPassword = async (password: string) => {
    try {
        const hashedPassword: string = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log('Hashing password failed : ', error);
        return '';
    }
}

export const compareHash = async (data: string, hashed: string) => {
    try {
        if (!data) {
            return false;
        }
        const compare: boolean = await bcrypt.compare(data, hashed);
        return compare;
    } catch (error) {
        throw new Error(`Compare Data failed. ${error}`);
    }
}

export const generateAccessToken = async (userId: string) => {
    return generateJWT(userId, config.ACCESS_TOKEN_KEY, '60000');
};

export const generateRefreshToken = async (userId: string) => {
    return generateJWT(userId, config.REFRESH_TOKEN_KEY, '1h');
};

export const verifyAccessToken = async (token: string) => {
    return verifyJWT(token, config.ACCESS_TOKEN_KEY);
};

export const verifyRefreshToken = async (token: string) => {
    return verifyJWT(token, config.REFRESH_TOKEN_KEY);
};

export const getUserIdFromToken = (token: string) => {
    try {
        jwt.decode(token)
        
    } catch (error) {
        
    }
};
