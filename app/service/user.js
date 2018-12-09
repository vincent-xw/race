// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
    /*
     * 根据登录名查找用户
     * @param {String} loginName 登录名
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    async getUserByLoginName(loginName) {
        const user = await this.app.mysql.get('user', {username: loginName});
        return {user};
    }
}
module.exports = UserService;
