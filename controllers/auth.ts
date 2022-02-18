import { Request, Response } from 'express';
import UserModel from '../models/user';
import RefreshTokenModel from '../models/refreshToken';
import { hashPassword, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../util/auth.util';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists.' });
        const hashedPassword: string = await hashPassword(password);
        const userDoc = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        const result = await userDoc.save();
        res.status(200).json({ status: true, msg: "user signup successfully", user: result });
    } catch (error) {
        console.log('Signing up user failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.' })
    }
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        /* Verify User */
        const userExists = await UserModel.findOne({ email });
        if (!userExists) return res.status(400).json({ status: true, msg: 'User Doesn\'t exists or the email is invalid.' });
        /* Validate Password */
        const isValidPassword = await userExists.comparePassword(password);
        if (!isValidPassword) {
            return res.status(400).json({ status: true, msg: 'Invalid Password.' });
        }
        /* Generate Refresh & Access Tokens */
        const [refreshToken, accessToken] = await Promise.all([generateRefreshToken(userExists._id), generateAccessToken(userExists._id)]);
        /* Remove previous token for this user */
        const refreshTokenExists = await RefreshTokenModel.findOne({ userId: userExists._id });
        if (refreshTokenExists) refreshTokenExists.deleteOne();
        /* Create & Save new Refresh Token */
        const refreshTokenDoc = new RefreshTokenModel({
            userId: userExists._id,
            refreshToken: refreshToken
        });
        const newRefreshToken = await refreshTokenDoc.save();
        /* Send Response */
        res.status(200).json({ status: true, msg: 'user signin successfully', user: userExists, accessToken, refreshToken: newRefreshToken.refreshToken });
    } catch (error) {
        console.log('Signing in user failed.', error);
        res.status(500).json({ status: false, msg: 'something went wrong.' })
    }
}


export const refreshToken = async (req: Request, res: Response) => {
    /*
    - check if token exists
    - compare plain token with hashed
    - verify access token : todo
    - create new access & refresh token
    */
    try {
        const { refreshToken, userId } = req.body;
        /* Check if current refresh token exists */
        const refreshTokenExists = await RefreshTokenModel.findOne({ userId, refreshToken });
        if (!refreshTokenExists) return res.status(400).json({ status: false, msg: 'Refresh Token Doesn\t exists in DB' });
        refreshTokenExists.deleteOne();
        /* Verify Refresh Token */
        const validToken = await verifyRefreshToken(refreshToken);
        if (!validToken) return res.status(400).json({ status: false, msg: 'Verify JWT Failed: Refresh Token is expired or invalid' });
        /* Generate Refresh & Access Tokens */
        const [newRefreshToken, accessToken] = await Promise.all([generateRefreshToken(userId), generateAccessToken(userId)]);
        /* Create & Save new Refresh Token */
        const refreshTokenDoc = new RefreshTokenModel({
            userId,
            refreshToken: newRefreshToken
        });
        const result = await refreshTokenDoc.save();
        /* Send Response */
        res.status(200).json({ status: true, msg: 'refresh token updated', accessToken, refreshToken: result.refreshToken });
    } catch (error) {
        console.log('reset refresh token failed.', error);
        res.status(500).json({ msg: 'something went wrong.' });
    }
}
