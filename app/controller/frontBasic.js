/**
 * @file 前台controller
 * @author vincent
 */
'use strict';

const Controller = require('../core/base.controller');

class FrontController extends Controller {
    /**
     *登录功能
     *
     * @returns
     * @memberof FrontController
     */
    async login() {
        let {ctx, app} = this;
        let {username, password} = ctx.req.body;
        const getUser = (username, type) => ctx.service.user.getUserByLoginName(username, type);
        const existUser = await getUser(username, 'front');

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
        ctx.logger.debug('passport.verify', existUser);
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
        this.success(existUser);
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
    /**
     *修改面膜
     *
     * @memberof FrontController
     */
    async changePwd() {
        let {
            ctx
        } = this;
        let query = [
            'oldPassword',
            'newPassword'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            oldPassword,
            newPassword
        } = ctx.req.body;
        let param = {
            oldPassword,
            newPassword
        };
        const change = param => ctx.service.user.changeUserPwd(param);
        const changeResult = await change(param);
        if (changeResult.status === 0) {
            this.logout();
            this.success(null, '操作成功，已自动注销，请您重新登录');
            return;
        }
        this.failed(null, changeResult.msg || '操作失败，请稍后再试', 500);
    }

}

module.exports = FrontController;
