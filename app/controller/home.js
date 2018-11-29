'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async info() {
        const ctx = this.ctx;
        const userId = ctx.params.id;
        const user = await ctx.service.user.find(1);
        ctx.body = user;
    }
}

module.exports = HomeController;
