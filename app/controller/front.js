'use strict';

const Controller = require('../core/base.controller');

/**
 *
 *
 * @class HomeController
 * @extends {Controller}
 */
class HomeController extends Controller {
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

module.exports = HomeController;
