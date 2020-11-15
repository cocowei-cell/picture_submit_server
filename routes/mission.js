const mission = require('koa-router')()
mission.post('/add',require('./mission/add'))
mission.get('/get',require('./mission/get'))
mission.get('/getCount',require('./mission/getCount'))

module.exports = mission.routes()