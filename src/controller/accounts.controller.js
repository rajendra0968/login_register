const express = require('express');
//const router = express.Router();
const Joi = require('joi');
//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
require('dotenv').config();
const accountService = require('../services/account.service');

//module.exports = {getAll,getById,create,start};
const jwt  =require('jsonwebtoken');
//

//
exports.check_in =  async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
           // res.json({result:'hii'})
           accountService.check_in(req.body)
           .then(accounts => res.send({code:200,msg:'successfully check_in'}).status(200))
           .catch(next);
        }
    })
   
}
exports.check_out = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.check_out(req.body)
        .then(accounts => res.send({code:200,msg:'successfully check_out'}).status(200))
        .catch(next);
        }
    })
    
}

// exports.absent = async(req, res, next)=>{
//     accountService.absent()
//         .then(accounts => res.json(accounts))
//         .catch(next);
// }
exports.holiday = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.holiday(req.body)
        .then(accounts => res.send({code:200,msg:'successfully holiday'}).status(200))
        .catch(next);
        }
    })
    
}
// exports.csv = async(req, res, next)=>{
//     jwt.verify(req.t,"wGU5FLFMiUxFy8v9mJjmUdi7X8fXB7yXFDbWFlED4fPentNfu2hw5uHVfi2cmvLy",(err,authData)=>{
//         if(err){
//             res.send({result:'invalid token'})
//         }
//         else{
//             accountService.csv(req.body)
//         .then(accounts => res.send({code:200,msg:'successfully holiday'}).status(200))
//         .catch(next);
//         }
//     })
    
// }
exports.leave_history = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.leave_history(req.body)
        .then(accounts => res.status(200).json(accounts))
        .catch(next);
        }
    })
    
}
exports.atten_request = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.atten_request(req.body)
            .then(accounts => res.send({code:200,msg:'successfully send attendance_request'}).status(200))
            .catch(next);
        }
    })
   
}
exports.atten = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.atten(req.body)
        .then(accounts => res.status(200).json(accounts))
        .catch(next);
        }
    })
    
}
// exports.attendance = async(req, res, next)=>{
//     accountService.attendance(req.body)
//         .then(accounts => res.json(accounts))
//         .catch(next);
// }
exports.leave = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.leave(req.body)
        .then(accounts => res.send({code:200,msg:'successfully send leave_request'}).status(200))
        .catch(next);
        }
    })
    
}
exports.pending = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.pending(req.body)
        .then(accounts => res.json(accounts))
        .catch(next);
        }
    })
    
}
exports.action = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.action(req.body)
        .then(accounts => res.send({code:200,msg:'successfully update leave_request '}).status(200))
        .catch(next);
        }
    })
    
}
exports.atten_update = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.atten_update(req.body)
        .then(accounts => res.send({code:200,msg:'successfully update attendance_request'}).status(200))
        .catch(next);
        }
    })
    
}
exports.leave_data = async(req, res, next)=>{
    jwt.verify(req.t,process.env.Secret,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'})
        }
        else{
            accountService.leave_data()
        .then(accounts => res.json(accounts))
        .catch(next);
        }
    })
    
}
// exports.getAll= async(req, res, next) =>{
//     accountService.getAll()
//         .then(accounts => res.json(accounts))
//         .catch(next);
// }

// exports.getById = (req, res, next)=>{
//     accountService.getById(req.params.id)
//         .then(account => account ? res.json(account) : res.sendStatus(404))
//         .catch(next);
// }


// exports.create = async(req, res, next)=> {
//     accountService.create(req.body)
//         .then(account => res.json(account))
//         .catch(next);
// }

