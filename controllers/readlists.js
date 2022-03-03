const router = require('express').Router();
const { Readlist } = require('../models');
const tokenExtractor = require('../middleware/tokenextractor');

router.put('/:id', tokenExtractor, async(req, res) => {
    const userId = req.decodedToken.id;
    if (userId) {
        const readlist = await Readlist.findOne({
            where: {
                user_id: userId,
                blog_id: req.params.id
            },
        });

        if (readlist) {
            readlist.done = req.body.read;
            await readlist.save();
            res.json(readlist)
        } else {
            res.status(400).json({ error: 'blog not found on user readlist' });
        }
    } else {
        res.status(401).json({ error: 'user not logged in' });
    }
});

module.exports = router;