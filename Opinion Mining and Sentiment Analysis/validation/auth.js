import Joi from 'joi';
import errorTexts from '../texts/errorTexts.js'

const login = async (req, res, next) => {
    let schema = Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': errorTexts.requiredFields.message,
            'string.empty': errorTexts.requiredFields.message,
            'string.email': errorTexts.incorrectFormat.message
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': errorTexts.requiredFields.message,
            'string.empty': errorTexts.requiredFields.message,
            'string.min': errorTexts.incorrectFormat.message
        })
    });

    const {error, value} = schema.validate(req.body, {
        abortEarly: false
    });

    let errors = {};
    if (error) {
        error.details.forEach(function (detail) {
            errors[detail.path[0]] = detail.message;
        });
        res.status(400).json({
            status: 'error',
            message: errors
        });
    } else {
        req.body = value;
        next();
    }
};

const register = (req, res, next) => {
    let schema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': errorTexts.requiredFields.message,
            'string.empty': errorTexts.requiredFields.message
        }),
        email: Joi.string().email().required().messages({
            'any.required': errorTexts.requiredFields.message,
            'string.empty': errorTexts.requiredFields.message,
            'string.email': errorTexts.incorrectFormat.message
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': errorTexts.requiredFields.message,
            'string.empty': errorTexts.requiredFields.message,
            'string.min': errorTexts.incorrectFormat.message
        })
    });

    const {error, value} = schema.validate(req.body, {
        abortEarly: false
    });

    let errors = {};
    if (error) {
        error.details.forEach(function (detail) {
            errors[detail.path[0]] = detail.message;
        });
        res.status(400).json({
            status: 'error',
            message: errors
        });
    } else {
        next();
    }
};

export default {
    login,
    register

};