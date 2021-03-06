import { body, validationResult, Result } from 'express-validator';
import { Request, Response } from 'express';
import { verifyAccessToken } from '../util/auth.util';
import { ServerResponse } from '../util/server.response';

export const rules = () => {
    return (
        [
            body('name')
                .notEmpty()
                .trim()
                .optional(),
            body('password')
                .isLength({ min: 8 })
                .trim(),
            body('email')
                .isEmail()
                .normalizeEmail()
        ]
    )
};

export const resetPasswordRules = () => {
    return (
        [
            body('userId')
                .isMongoId(),
            body('token')
                .notEmpty(),
            body('password')
                .isLength({ min: 8 })
                .trim()
        ]
    )
};

export const refreshTokendRules = () => {
    return (
        [
            body('refreshToken')
                .notEmpty()
        ]
    )
};

export const forgotPasswordRules = () => {
    return (
        [
            body('email')
                .isEmail()
                .normalizeEmail()
        ]
    )
};

export const result = (req: Request, res: Response, next: any) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, msg: ServerResponse.ERROR_REQUEST_VALIDATOR, errors: errors.array() });
    }
    next();
};

export const validateJWT = async (req: Request, res: Response, next: any) => {
    try {
        let token = req.header('x-token');
        if (!token) {
            return res.status(401).json({ status: false, msg: ServerResponse.ERROR_MISSING_TOKEN });
        }
        let jwtPayload = await verifyAccessToken(token);
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: false, msg: ServerResponse.ERROR_EXPIRED_TOKEN });
    }
}