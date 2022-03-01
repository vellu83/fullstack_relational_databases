const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Blog, User } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models/blog');

router.get('/', async(req, res) => {

    const authors = await Blog.findAll({
        attributes: ['author', [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
            [sequelize.fn('sum', sequelize.col('likes')), 'likes']
        ],
        group: 'author'
    });

    res.json(authors);
});



module.exports = router;