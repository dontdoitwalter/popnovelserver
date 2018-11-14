let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let Suggest = sequelize.import('../models/suggest')
let bcrypt = require ('bcryptjs');
let jwt = require('jsonwebtoken');
const validateSesh = require('../middleware/validatesession')

/*CREATE NEW ACCOUNT*/
router.post('/signup', function(req, res){
    let DisplayName = req.body.user.displayname;
    let Password = req.body.user.passwordhash;
    let Email = req.body.user.email;
    let FirstName = req.body.user.firstname;
    let LastName = req.body.user.lastname;
    let Hometown = req.body.user.hometown;
    let AboutMe = req.body.user.aboutme;
    User.create({
        displayname:DisplayName,
        passwordhash:bcrypt.hashSync(Password, 10),
        email:Email,
        firstname:FirstName,
        lastname:LastName,
        hometown:Hometown,
        aboutme:AboutMe,
    }).then(
        function createSuccess(user){
            let token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:60*60*24});
            res.json({
                user:user,
                message:'created',
                sessionToken: token
            });
        },
        function createError(err){
            res.send(500,err.message);
        });
});
/*SIGN IN TO EXISTING ACCOUNT*/
router.post('/login', function(req, res){
    User.findOne({where:{displayname:req.body.user.displayname}})
    .then(
        function(user){
            if(user){
                bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function(err, matches){
                    if(matches){
                        let token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:60*60*24});
                        res.json({
                            user:user,
                            message:'Successfully Authenticated',
                            sessionToken:token
                        });
                    }else{
                        res.status(502).send({error:"Failed to authenticate"});
                    }
                });
                }else{
                    res.status(500).send({error:'Still failed'});
                }
            },
            function(err){
                res.status(501).send({error:"Failed again"});
            });
});
/*ALL PROFILE INFO FOR USER*/
router.get('/info/:id', validateSesh, function(req, res){
    let userid = req.user.id;
    User.findOne({
        where:{id:userid}
    }).then(
        function findAllSuccess(data){
            res.json({ user: data });
        },
        function findAllError(err){
            res.send(500, err.message)
        }
    )
});
/*DELETE ACCOUNT*/
router.delete('/delete', validateSesh,function(req, res){
    let userid = req.user.id;
    User.destroy({
        where:{id:userid}
    }).then(
        function deleteSuccess(data){
            res.send("Account deleted")
        },
        function deleteAccountError(err){
            res.send(500, err.message);
        }
    )
});
/*UPDATE PROFILE*/
router.put('/update/:id', validateSesh, function(req, res){
    let data = req.params.id;
    let FirstName = req.body.user.firstname;
    let LastName = req.body.user.lastname;
    let Hometown = req.body.user.hometown;
    let AboutMe = req.body.user.aboutme;
    User.update({
        firstname:FirstName,
        lastname:LastName,
        hometown:Hometown,
        aboutme:AboutMe
    },
    {where:{id:data}}
    ).then(
        function updateSuccess(updatedProfile){
            res.json({
                message:"Your profile has been updated"
            })
        },
        function updateError(err){
            res.send(500, res.send)
        })
});
router.post('/suggest', validateSesh, function(req, res){
    let Suggestion = req.body.submission.suggest;

    Suggest.create({
        suggest:Suggestion
    }).then(
        function suggestSuccess(user){
            res.json({
                message:'Thank you for your suggestion!'
            })
        }
    )
    function createError(err){
        res.send(500, err.message)
    }
})
module.exports = router;