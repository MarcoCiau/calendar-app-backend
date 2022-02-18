import { body, validationResult, Result } from 'express-validator';
import { Request, Response } from 'express';

export const rules = () => {
    return (
        [
            body('name')
                .notEmpty()
                .trim(),
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
            body('userId')
                .isMongoId(),
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
        return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
};