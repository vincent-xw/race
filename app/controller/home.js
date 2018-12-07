'use strict';

const Controller = require('../core/base.controller');

/**
 *
 *
 * @class HomeController
 * @extends {Controller}
 */
class HomeController extends Controller {
    async info() {
        const ctx = this.ctx;
        const userId = ctx.params.id;
        // const user = await ctx.service.user.find(1);
        // ctx.body = user;
        // this.success({
        //     name: 'jiaxuewen',
        //     age: 26
        // });
        this.notFound("notFound");
    }
}

module.exports = HomeController;
