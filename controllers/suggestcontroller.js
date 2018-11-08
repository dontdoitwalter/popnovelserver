let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let UserSuggestion = sequelize.import('../models/suggest');

router.post('/suggest', function(req, res){
    let Suggestion = req.body.user.suggest;

    UserSuggestion.create({
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