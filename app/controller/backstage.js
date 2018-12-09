'use strict';

const Controller = require('../core/base.controller');

class BackstageController extends Controller {
    // 登录获取基本信息
    info(callback) {
        const user = this.ctx.user;
        if (user && callback) {
            callback();
        }
        else if (user && !callback) {
            this.success(user);
        }
        else {
            this.needAuth();
        }
    }

}

module.exports = BackstageController;
