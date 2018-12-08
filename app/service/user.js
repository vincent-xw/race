// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
    /*
     * 根据登录名查找用户
     * @param {String} loginName 登录名
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    getUserByLoginName(loginName) {
        const query = {
            loginname: new RegExp('^' + loginName + '$', 'i')
        };
        return this.ctx.model.User.findOne(query).exec();
    }
}
module.exports = UserService;