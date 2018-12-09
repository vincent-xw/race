'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    init() {
        this.initData = {
            status: 0,
            msg: ''
        };
    }
    success(data) {
        this.init();
        this.ctx.body = {
            ...this.initData,
            data: {
                ...data
            }
        };
    }
    needAuth() {
        this.init();
        this.ctx.body = {
            ...this.initData,
            status: 403,
            msg: '请重新登录'
        };
        this.ctx.status = 403;
    }
    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}

module.exports = BaseController;
