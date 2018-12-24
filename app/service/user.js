// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
    /*
     * 根据登录名查找用户
     * @param {String} loginName 登录名
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    async getUserByLoginName(loginName, type) {
        let user = null;
        if (type === 'front') {
            user = await this.app.mysql.get('agent', {username: loginName});
        }
        else {
            user = await this.app.mysql.get('user', {username: loginName});
        }
        return user;
    }
    /**
     *根据旧密码更新密码
     *
     * @param {*} userData
     * @memberof UserService
     */
    async changeUserPwd(userData) {
        try {
            let userId = this.ctx.request.user;
            let userInfo = await this.app.mysql.get('agent', {
                id: userId
            });
            if (userInfo.password !== userData.oldPassword) {
                return {
                    status: 500,
                    msg: '原密码不正确，请重试'
                };
            }
            let param = {
                password: userData.newPassword
            };
            let changeResult = await this.app.mysql.update('agent', param, {
                where: {
                    id: userId
                }
            });
            return changeResult.affectedRows === 1 ? {
                status: 0,
                msg: '修改成功'
            }
            : {
                status: 500,
                msg: '无修改'
            };
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}
module.exports = UserService;
