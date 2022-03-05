import { Request, Response } from 'express';
import UserModel from '../models/user';
import RefreshTokenModel from '../models/refreshToken';
import { hashPassword, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../util/auth.util';
import { ServerResponse } from '../util/server.response';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) return res.status(400).json({ status: false, msg: ServerResponse.ERROR_USER_EXISTS });
        const hashedPassword: string = await hashPassword(password);
        const userDoc = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        const result = await userDoc.save();
        /* Generate Refresh & Access Tokens */
        const [refreshToken, accessToken] = await Promise.all([generateRefreshToken(result._id), generateAccessToken(result._id)]);
        /* Remove previous token for this user */
        const refreshTokenExists = await RefreshTokenModel.findOne({ user: result._id });
        if (refreshTokenExists) refreshTokenExists.deleteOne();
        /* Create & Save new Refresh Token */
        const refreshTokenDoc = new RefreshTokenModel({
            user: result._id,
            refreshToken: refreshToken
        });
        const newRefreshToken = await refreshTokenDoc.save();
        /* Send Response */
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, user: result, accessToken, refreshToken: newRefreshToken.refreshToken });
    } catch (error) {
        console.log('Signing up user failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER });
    }
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        /* Verify User */
        const userExists = await UserModel.findOne({ email });
        if (!userExists) return res.status(400).json({ status: false, msg: ServerResponse.ERROR_USER_NOT_FOUND });
        /* Validate Password */
        const isValidPassword = await userExists.comparePassword(password);
        if (!isValidPassword) {
            return res.status(400).json({ status: false, msg: ServerResponse.ERROR_USER_BAD_PASSWORD });
        }
        /* Generate Refresh & Access Tokens */
        const [refreshToken, accessToken] = await Promise.all([generateRefreshToken(userExists._id), generateAccessToken(userExists._id)]);
        /* Remove previous token for this user */
        const refreshTokenExists = await RefreshTokenModel.findOne({ user: userExists._id });
        if (refreshTokenExists) refreshTokenExists.deleteOne();
        /* Create & Save new Refresh Token */
        const refreshTokenDoc = new RefreshTokenModel({
            user: userExists._id,
            refreshToken: refreshToken
        });
        const newRefreshToken = await refreshTokenDoc.save();
        /* Send Response */
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, user: userExists, accessToken, refreshToken: newRefreshToken.refreshToken });
    } catch (error) {
        console.log('Signing in user failed.', error);
        res.status(500).json({ status: false, msg: ServerResponse.ERROR_INTERNAL_SERVER })
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
        const { refreshToken } = req.body;
        /* Verify Refresh Token */
        const validToken: any = await verifyRefreshToken(refreshToken);
        if (!validToken) return res.status(400).json({ status: false, msg: ServerResponse.ERROR_EXPIRED_TOKEN });
        const { userId } = validToken;
        /* Check if current refresh token exists */
        const refreshTokenExists = await RefreshTokenModel.findOne({ user: userId, refreshToken });
        if (!refreshTokenExists) return res.status(400).json({ status: false, msg: ServerResponse.ERROR_INVALID_TOKEN });
        refreshTokenExists.deleteOne();
        /* Generate Refresh & Access Tokens */
        const [newRefreshToken, accessToken] = await Promise.all([generateRefreshToken(userId), generateAccessToken(userId)]);
        /* Create & Save new Refresh Token */
        const refreshTokenDoc = new RefreshTokenModel({
            user: userId,
            refreshToken: newRefreshToken
        });
        const result = await (await refreshTokenDoc.save()).populate('user', 'name');
        /* Send Response */
        res.status(200).json({ status: true, msg: ServerResponse.OK_PROCESS, accessToken, user: result.user, refreshToken: result.refreshToken });
    } catch (err: any) {
        console.log('reset refresh token failed.', err);
        res.status(400).json({ status: false, msg: err.message });
    }
}
