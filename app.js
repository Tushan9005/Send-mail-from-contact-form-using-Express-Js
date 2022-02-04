const express = require('express');
var bodyParser = require('body-parser');
const app= express();

require('dotenv').config();
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/contact',urlencodedParser, function(req,res){
    console.log(req.body);
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let details = {
        from: process.env.EMAIL,
        to: process.env.REMAIL,
        subject: "testing our nodemailer",
        text: `Name: ${req.body.message}<br>Email: ${req.body.email}<br>Phone: ${req.body.phone}<br>Website: ${req.body.website}<br>Message: ${req.body.message}`
    }
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log("It has an error",err)
        }
        else{
            console.log("Email has been sent!")
            res.render('success',{data: req.body});
        }
    })
    
})


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
