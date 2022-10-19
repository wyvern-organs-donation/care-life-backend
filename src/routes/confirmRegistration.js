const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/confirmation/:id/:token', async (req, res, next) => {
    var token = await prisma.confirmation_tokens.findFirst({ where: {token: req.params.token} })
        // token is not found into database i.e. token may have expired 
    if (!token){
        return res.status(400).json({message:'Invalid token.'});
    }
    if (token.expiration < new Date()){
        return res.status(400).json({message:'Your verification link may have expired. Please click on resend for verify your Email.'});
    }
    // if token is found then check valid user 
    else{
        var user = await prisma.users.findFirst({ where: {id: parseInt(req.params.id), tokens: {every: {token: req.params.token} }}})
        // not valid user
        if (!user){
            return res.status(401).json({message: 'We were unable to find a user for this verification. Please SignUp!'});
        } 
        // user is already verified
        else if (user.status){
            return res.status(200).json({message: 'User has been already verified. Please Login'});
        }
        // verify user
        else{
            // change isVerified to true
            user =  await prisma.users.update({ 
                where: {
                    id: parseInt(req.params.id)
                }, data: {
                    status: true
                } 
            });
            return res.status(200).json({message: 'Email has been confirmed sucessfully'});
        }
    }
});

module.exports = router;