const db            = require("../models");
const User          = db.users;

exports.me = (req, res) => {
    let id = req.user.id;

    User.findOne({
        attributes: {exclude: ['password']},
        where:{
            id: req.user.id
        }
    }).then(async (data) => {
        return res.status(400).send(data);
    })
    .catch(err => {
        return res.status(400).send({
            message:"Something went wrong! Please try again later"
        });
    });
}

exports.update_profile = (req, res) => {
    let id      = req.user.id;
    let userId  = req.params.id;

    if(id){
        let status = 'Pending';
        const full_name         = req.body.full_name ? req.body.full_name : '';
        const address_line_1    = req.body.address_line_1 ? req.body.address_line_1 : '';
        const address_line_2    = req.body.address_line_2;
        const city              = req.body.city ? req.body.city: '';
        const state             = req.body.state ? req.body.state: '';
        const zip_code          = req.body.zip_code ? req.body.zip_code: '';

        if(full_name && address_line_1 && address_line_2 &&  city && state && zip_code){
            status = 'Active';
        }
        User.update({
            full_name,
            address_line_1,
            address_line_2,
            city, 
            state, 
            zip_code, 
            status
        }, {
			where: {id: userId}
		}).then(_data => {
            if(_data){
                User.findOne({
                    attributes: {exclude: ['password']},
                    where:{
                        id: req.body.id
                    }
                })
                .then(async (_user) => {
                    return res.status(200).send(_user);
                }).catch(err => {
                    res.status(500).send({message: err.message})
                });
            }else{
                return res.status(400).send({
                    message:"Something went wrong! Please try again"
                }); 
            }
    
        }).catch(err => {
            res.status(500).send({message: err.message})
        });
    }else{
        return res.status(400).send({
            message:"Invalid request submitted"
        });
    }
}
