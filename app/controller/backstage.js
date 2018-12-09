'use strict';

const Controller = require('../core/base.controller');

class BackstageController extends Controller {
    // 登录获取基本信息
    info(user) {
        user = user || this.ctx.user;
        user ? this.success() : this.needAuth();
    }

    getRaceList() {
        const user = this.ctx.user;
        if(!user) {
            
        }
    }
}

module.exports = BackstageController;
