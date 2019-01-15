
/* eslint-disable fecs-camelcase */
/**
 * @file 统计相关
 * @author Vincent
 */

'use strict';

const Controller = require('../core/base.controller');

class StatController extends Controller {
    /**
     *统计接口
     *
     * @returns
     * @memberof StatController
     */
    async stat() {
        let {
            ctx
        } = this;
        let {
            league_id,
            stat_type
        } = ctx.req.body;
        let start_time = ctx.req.body.date[0];
        let end_time = ctx.req.body.date[1];
        const statInfo = {
            start_time,
            end_time,
            league_id,
            stat_type
        };
        const getStat = statInfo => ctx.service.backstage.stat.getStat(statInfo);
        const statResult = await getStat(statInfo);
        if (statResult) {
            this.success(statResult, '获取成功');
            return;
        }
        this.failed(null, '获取失败', 500);
    }
}

module.exports = StatController;
