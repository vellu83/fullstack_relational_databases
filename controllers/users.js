const router = require('express').Router();

const { User, Blog, Readlist } = require('../models');

router.get('/', async(req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] },
        },
    });
    res.json(users);
});

router.post('/', async(req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

router.get('/:id', async(req, res) => {
    let where = {}
    if (req.query.read) where = { done: req.query.read }
    const user = await User.findByPk(req.params.id, {
        include: [{
                model: Blog,
                attributes: { exclude: ['userId'] },
            },
            {
                model: Blog,
                as: 'readings',
                attributes: { exclude: ['userId'] },
                through: {
                    attributes: [
                        ['done', 'read'], 'id'
                    ],
                    where
                },
            },
        ],
    });
    res.json(user);
});

router.put('/:username', async(req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username,
        },
    });
    user.username = req.body.username;
    await user.save();
    res.json(user);
});

module.exports = router;