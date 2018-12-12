'use strict';

const Controller = require('../core/base.controller');

class BackstageBasicController extends Controller {
    /**
     * @name 登录
     * @memberof BackstageBasicController
     */
    async login() {
        let {ctx, app} = this;
        let {username, password} = ctx.req.body;
        // 检查参数毕传
        let query = [
            'username',
            'password'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        const getUser = (username, type) => ctx.service.user.getUserByLoginName(username, type);
        const existUser = await getUser(username, 'backstage');

        // 用户不存在
        if (!existUser) {
            this.failed({
                status: 500,
                msg: '用户名不存在或者用户名密码不对，请核实后重试'
            });
            return;
        }
        const equal = password === existUser.password;

        // 密码不匹配
        if (!equal) {
            this.failed({
                status: 500,
                msg: '用户名不存在或者用户名密码不对，请核实后重试'
            });
            return;
        }
        ctx.logger.debug('loginverify', existUser);
        // id存入Cookie, 用于验证过期.
        const authToken = existUser.id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
        const opts = {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24,
            signed: true,
            httpOnly: true,
            encrypt: true
        };
        ctx.cookies.set(app.config.auth_cookie_name, authToken, opts); // cookie 有效期1天
        this.success(null, '登录成功');
        return;
    }
    /**
     *
     * @name 注销
     * @memberof BackstageBasicController
     */
    logout() {
        let {ctx, app} = this;
        ctx.cookies.set(app.config.auth_cookie_name, null);
        this.success(null, '注销成功');
    }
}

module.exports = BackstageBasicController;
