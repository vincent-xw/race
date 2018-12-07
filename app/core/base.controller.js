'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    init() {
        this.initData = {
            status: 200,
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
    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}

module.exports = BaseController;
