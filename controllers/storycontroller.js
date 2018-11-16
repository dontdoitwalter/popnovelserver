let express = require('express');
let router = express.Router();
let sequelize = require('../db');
const validateSesh = require('../middleware/validatesession')
let UserStory = sequelize.import('../models/story');

router.post('/story', validateSesh, function(req, res){
    let Story = req.body.storysubmit.story;
    UserStory.create({
        story:Story
    }).then(
        function storySuccess(user){
            res.json({
                message:'Thank you for your submission'
            })
        }
    )
    function createError(err){
        res.send(500, err.message)
    }
})
router.get('/read', validateSesh, function(req, res){
    let Story=req.body.storysubmit.story
    Story.findAll({
        
    }).then(
        function getSuccess(story){
            res.json(story)
        },
        function getError(err){
            res.send(500,err.message)
        }
    )
})
module.exports = router;