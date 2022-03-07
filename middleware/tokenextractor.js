const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Session, User } = require('../models');

const tokenExtractor = async(req, res, next) => {
    const session = await Session.findByPk(req.cookies['sessionId']);

    const authorization = req.get('authorization');

    if (!session ||
        session.validUntil.getTime() < new Date().getTime()
    ) {
        return res.status(400).json({ error: 'session expired, please login' });
    }

    if (session.token !== authorization.substring(7)) {
        return res.status(401).json({ error: 'authorization failed or expired' })
    }

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7));

            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
            const user = await User.findByPk(req.decodedToken.id);
            if (user.disabled) {
                return res.status(401).json({ error: 'user disabled by admin!' });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: 'token invalid' });
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }
    next();
};

module.exports = tokenExtractor;