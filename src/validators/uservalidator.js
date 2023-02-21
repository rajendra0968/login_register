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
            otp_verify: Joi.boolean().allow(null).allow('').optional(),
            password:Joi.string().allow(null).allow('').optional(),
            phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            pincode: Joi.number().required(),
            role_name: Joi.string().required(),
            status: Joi.string().required(),
        });
        return output(req,res,next,schema);
    }
    async admin_userCreateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            name:Joi.string().min(6).max(25).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            pincode: Joi.number().required(),
            role_name: Joi.string().required(),
            status: Joi.string().required(),
        });
        return output(req,res,next,schema);
    }
    async roleValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            role_name:Joi.string().min(6).max(25).required(),
            role_code:Joi.string().min(6).pattern(/^[A-Z]+$/).max(25).required(),
        });
        return output(req,res,next,schema);
    }
    async login_CreateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            state:Joi.string(),
            city:Joi.string(),
            country:Joi.string(),
            ip:Joi.string(),
        });
        
        return output(req,res,next,schema);
        // schema options
        
    }
    async id_CreateValidator(req, res, next) {
        // create schema object
       const schema = await req.query;
        if(schema.id == null || schema.id == ''){
            return res.status(400).send('expects value to be defined,but undefined is passed');
        }
        else{
            return next();
        }
        // schema options
        
    }
     
}
async function output(req,res,next,schema){
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
        next(res.status(409).json({message:errorMessage}));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;           
        return next();
    }
}

module.exports = UserValidator;
