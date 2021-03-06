import { body, param, query, validationResult, Result, CustomValidator, checkSchema, Schema } from 'express-validator';
import { Request, Response } from 'express';
import { ServerResponse } from '../util/server.response';

let validateSortValue: CustomValidator = value => {
    return (Number(value) === -1 || Number(value) === 1)
}

export const getAllRules = () => {
    return (
        [
            query('from')
                .notEmpty()
                .isInt()
                .isLength({ min: 0 })
                .optional(),
            query('limit')
                .notEmpty()
                .isInt()
                .isLength({ min: 1 })
                .optional(),
            query('sort')
                .isInt()
                .custom(validateSortValue)
                .optional(),
        ]
    )
};

export const createRules = () => {
    return (
        [
            body('title')
                .notEmpty()
                .isString()
                .trim(),
            body('notes')
                .isString()
                .trim()
                .optional(),
            body('start')
                .notEmpty()
                .isISO8601().toDate(),
            body('end')
                .notEmpty()
                .isISO8601().toDate(),
        ]
    )
};

export const mongoIdRule = () => {
    return (
        [
            param('id')
                .isMongoId(),
        ]
    )
};

export const updateRules = () => {
    return (
        [
            body('title')
                .notEmpty()
                .isString()
                .trim()
                .optional(),
            body('notes')
                .isString()
                .trim()
                .optional(),
            body('start')
                .notEmpty()
                .isISO8601().toDate()
                .optional(),
            body('end')
                .notEmpty()
                .isISO8601().toDate()
                .optional(),
        ]
    )
};

export const result = (req: Request, res: Response, next: any) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false,  msg: ServerResponse.ERROR_REQUEST_VALIDATOR, errors: errors.array() });
    }
    next();
};
