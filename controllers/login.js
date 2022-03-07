const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async(request, response) => {
    const body = request.body
    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === 'salainenSana'

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    if (user.disabled) {
        return response.status(401).json({ error: 'user disabled by admin!' })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)
    const validUntilDate = new Date()
    validUntilDate.setHours(validUntilDate.getHours() + 4)

    const session = await Session.create({
        userId: user.id,
        token: token,
        validUntil: validUntilDate
    })

    await user.save()

    response
        .cookie('sessionId', session.id)
        .status(200)
        .send({ token, username: user.username, })
})

module.exports = router