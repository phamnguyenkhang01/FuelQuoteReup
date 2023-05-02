const db            = require("../models");
const User          = db.users;
const bcrypt        = require("bcryptjs");
const jwt           = require('jsonwebtoken');
var validator       = require("email-validator");

require('dotenv').config();

exports.register = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if(!validator.validate(email)){
        return res.status(400).send({
            message:"Provided email address is invalid"
        });
    }else if(password === ''){
        return res.status(400).send({
            message:"Password can not be blank"
        });
    }else{
        User.findOne({
            where:{
                email:email
            }
        }).then(async (data) => {
            if(data && data.status !== 'Deleted'){
                return res.status(400).send({
                    message:"User already exist with this email address."
                });
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                // Create a user
                const user = {
                    email: email,
                    password: hashedPassword
                };
                // Save user in the database
                User.create(user)
                    .then(_data => {                
                        return gerUserCreateResponse(_data, res);
                    })
                    .catch(err => {
                        res.status(500).send({message: "Some error occurred while creating the user."+err.message})
                    });
            }            
        }).catch(err => {
            res.status(500).send({message: "Some error occurred while getting user information."+err.message})
        });
    }
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if(email === ''){
        return res.status(400).send({
            message:"Email can not be blank"
        });
    }else if(password === ''){
        return res.status(400).send({
            message:"Password can not be blank"
        });
    }else{
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(async (data) => {
            if(data.status == 'Deleted'){
                return res.status(400).send({
                    message:"Invalid credential submitted or requested account is deleted"
                });
            }else{
                const validPassword = await bcrypt.compare(req.body.password, data.password);
                if(!validPassword)
                    return res.status(400).send({
                        message:"Invalid password or user does not exist"
                    });
    
                else{
                    return gerUserCreateResponse(data, res);
                }
            }
        })
        .catch(err => {
            return res.status(400).send({
                message:"Invalid email or user does not exist"
            });
        });
    }
};

function gerUserCreateResponse(data, res){
    const token = jwt.sign({id:data.id, email: data.email}, 'SECRET_KEY');
    const user = {
        id: data.id,
        email: data.email,
        full_name: data.full_name ? data.full_name : '',
        address_line_1: data.address_line_1 ? data.address_line_1 : '',
        address_line_2: data.address_line_2 ? data.address_line_2 : '',
        city: data.city ? data.city : '',
        state: data.state ? data.state : '',
        zip_code: data.zip_code ? data.zip_code : '',
        status: data.status ? data.status : ''
    }

    return res.status(200).header('Authorization').send({
        accessToken: token,
        user: user
    });
}
