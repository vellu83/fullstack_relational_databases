const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const tokenExtractor = require('../middleware/tokenextractor')


router.delete('/', tokenExtractor, async(req, res) => {

    const user = await User.findByPk(req.decodedToken.id);
    if (!user) res.status(401).json({ error: 'unauhtorized' });

    const body = req.body

    await Session.destroy({
        where: {
            userId: user.id
        }
    })

    res.status(204).end()
})

module.exports = router