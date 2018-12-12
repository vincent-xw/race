'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    /**
     * @name 初始化数据结构
     *
     * @memberof BaseController
     */
    init() {
        this.initData = {
            status: 0,
            msg: ''
        };
    }
    /**
     *
     * @name 成功回调
     * @param {*} data
     * @param {*} msg
     * @memberof BaseController
     */
    success(data, msg) {
        this.init();
        if (data) {
            this.ctx.body = {
                ...this.initData,
                msg,
                data: {
                    ...data
                }
            };
        }
        else {
            this.ctx.body = {
                ...this.initData,
                msg
            };
        }
        
    }
    /**
     * @name 失败回调
     *
     * @param {*} data
     * @param {*} msg
     * @memberof BaseController
     */
    failed(data, msg, status) {
        this.ctx.body = {
            status: status || 500,
            msg: msg || '',
            ...data
        };
    }
    /**
     * @name 需要鉴权回调
     *
     * @memberof BaseController
     */
    needAuth() {
        this.init();
        this.ctx.body = {
            ...this.initData,
            status: 403,
            msg: '请重新登录'
        };
        this.ctx.status = 403;
    }
    /**
     * @name 毕传检查
     *
     * @memberof BaseController
     */
    requireCheck(obj) {
        let {ctx} = this;
        if (obj instanceof Array) {
            for (let i = 0; i < obj.length; i++) {
                if (ctx.req.body[obj[i]] === undefined) {
                    this.ctx.body = {
                        status: 401,
                        msg: '参数' + obj[i] + '必传,目前并未获取到'
                    };
                    this.ctx.status = 401;
                    return false;
                }
            }
            return true;
        }
        ctx.logger.error(new Error('obj is not Array instance'));
    }
}

module.exports = BaseController;
