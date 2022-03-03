const router = require('express').Router();

const { Blog, User } = require('../models');
const { Op } = require('sequelize');
const tokenExtractor = require('../middleware/tokenextractor')

const blogFinder = async(req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

router.get('/', async(req, res) => {
    let where = {};

    if (req.query.search) {
        where = {
            [Op.or]: [{
                    title: {
                        [Op.iLike]: `%${req.query.search}%`,
                    },
                },
                {
                    author: {
                        [Op.iLike]: `%${req.query.search}%`,
                    },
                },
            ],
        };
    }

    const blogs = await Blog.findAll({
        order: [
            ['likes', 'DESC']
        ],
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name', 'id'],
        },
        where,
    });

    res.json(blogs);
});

router.post('/', tokenExtractor, async(req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) res.status(401).json({ error: 'unauhtorized' });
    const blog = await Blog.create({...req.body, userId: user.id });
    res.json(blog);
});

router.delete('/:id', tokenExtractor, blogFinder, async(req, res) => {
    const blogUserId = req.blog.dataValues.userId;

    if (req.decodedToken.id === blogUserId) {
        await req.blog.destroy();
        res.status(204).end();
    } else {
        res.status(401).json({ error: 'unauhtorized' });
    }
});

router.put('/:id', blogFinder, async(req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        res.json(req.blog);
    }
});

module.exports = router;