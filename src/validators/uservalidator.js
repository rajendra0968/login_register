const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../../_helpers/apiError');
//

class UserValidator {
    async userCreateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            name:Joi.string().min(6).max(25).required(),
            email: Joi.string().email().required(),
            password: Joi.boolean().required(),
            phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            pincode: Joi.number().required(),
            role_name: Joi.string().required(),
            status: Joi.string().required(),

        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);
        
        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message.replace(/\"/g,"");
                })
                .join(', ');
            next(res.json({ message:errorMessage}));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;           
            return next();
        }
    }
}

module.exports = UserValidator;
