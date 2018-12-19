/**
 * @file 前台联赛controller
 */
'use strict';

const Controller = require('../core/base.controller');

class LeagueController extends Controller {
    /**
     *获取联赛list
     *
     * @memberof FrontLeagueController
     */
    async list() {
        let {
          ctx
        } = this;
        const getLeagueList = () => ctx.service.front.league.getLeagueList();
        const leagueListResult = await getLeagueList();

        if (leagueListResult) {
            this.success(leagueListResult, '查询成功');
            return;
        }
        this.failed(null, '查询失败', 500);
    }
}
module.exports = LeagueController;