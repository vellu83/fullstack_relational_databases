const Blog = require('./blog')
const User = require('./user')
const Readlist = require('./readlist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)
User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: Readlist, as: 'readings' })
Blog.belongsToMany(User, { through: Readlist, as: 'usersMarked' })

module.exports = {
    Blog,
    User,
    Readlist,
    Session
}