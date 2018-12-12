'use strict';

const Controller = require('../core/base.controller');

class BackstageLeagueController extends Controller {
    async addLeague() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'league_name'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            league_name,
            league_remark = ''
        } = ctx.req.body;
        const inserLeague = (league_name, league_remark) => ctx.service.backstage.league.insertLeague({league_name, league_remark});
        const leagueResult = await inserLeague(league_name, league_remark);

        if (leagueResult) {
            this.success(null, '创建成功');
            return;
        }
        this.failed(null, '创建失败', 500);

    }
}

module.exports = BackstageLeagueController;
