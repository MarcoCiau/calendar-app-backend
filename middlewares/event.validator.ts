import { body, param, query, validationResult, Result, CustomValidator, checkSchema, Schema } from 'express-validator';
import { Request, Response } from 'express';

let validateSortValue: CustomValidator = value => {
    return (Number(value) === -1 || Number(value) === 1)
}

let validateQueryString: CustomValidator = value => {
    return JSON.parse(value).hasOwnProperty('userId');
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
            query('query')
                .custom(validateQueryString)
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
                .notEmpty()
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
                .notEmpty()
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
        return res.status(400).json({ status: false,  errors: errors.array() });
    }
    next();
};
