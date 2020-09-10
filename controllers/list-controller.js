const router = require('express').Router();
const List = require('../db').import('../models/list');
const validateSession = require('../middleware/validate-session');
