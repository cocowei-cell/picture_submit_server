const user = require('koa-router')();

// 用户注册页面
user.post('/regester',require('./user/regester'))
user.post('/login',require('./user/login'))
user.delete('/delete/:id',require('./user/delete'))
user.put('/refresh',require('./user/refresh'))

module.exports = user.routes();