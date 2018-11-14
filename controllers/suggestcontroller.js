let express = require('express');
let router = express.Router();
let sequelize = require('../db');
const validateSesh = require('../middleware/validatesession')
let UserSuggestion = sequelize.import('../models/suggest');

