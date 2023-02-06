const router = require('express').Router();
const controller = require('../controller/accounts.controller');
//
const jwt  =require('jsonwebtoken');
// const createToken = async(req,res)=>{
//     const token = await jwt.sign({id:'1'},"dkfjdkfjdkfjkdfjdkfdkjkddkfkdkdjfkdjfkd");
//     console.log(token);
//     //const userify = await jwt.verify(token,'dkfjdkfjdkfjkdfjdkfdkjkddkfkdkdjfkdjfkd');
//     //console.log(userify)
// }
// router.post('/login',async(req,res)=>{
//     const token = await jwt.sign({id:'1'},"wGU5FLFMiUxFy8v9mJjmUdi7X8fXB7yXFDbWFlED4fPentNfu2hw5uHVfi2cmvLy");
//     res.send(token);
// })
//
//const jwt  = require('jsonwebtoken');
function verify(req,res,next){
    const bearer = req.headers['authorization'];
    if(typeof bearer !== undefined){
        const b  = bearer.split(" ");
        const t = b[1];
        req.t = t;
        next();
    }
    else{
        res.send({result:'token is not valid'});
    }    
}
//
router.post('/check_in',verify,controller.check_in);//chek_in 
router.post('/check_out',verify,controller.check_out);//check_out
router.post('/holiday',verify,controller.holiday);//holiday
//leave request
router.post('/leave',verify,controller.leave);//leave save
router.get('/pending',verify,controller.pending);//pending approvation
router.post('/action',verify,controller.action);//approve or reject update
router.get('/leave',verify,controller.leave_data);//approve notification
//atten request
router.post('/atten_update',verify,controller.atten_update);//attendance request approve or reject update
//atten
router.get('/attendance',verify,controller.atten);//count attendance
//attendance request
router.post('/attendance_request',verify,controller.atten_request);
//router.get('/csv',controller.csv);
//router.get('/leave_history',controller.leave_history);//leave_history
module.exports = router;