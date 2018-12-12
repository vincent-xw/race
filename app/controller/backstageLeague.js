'use strict';

const Controller = require('../core/base.controller');
/**
 *联赛class
 *
 * @class BackstageLeagueController
 * @extends {Controller}
 */
class BackstageLeagueController extends Controller {
    /**
     *新增联赛接口
     *
     * @returns
     * @memberof BackstageLeagueController
     */
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
    /**
     *更新联赛
     *
     * @returns
     * @memberof BackstageLeagueController
     */
    async modifyLeague() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'league_id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            league_id,
            league_name,
            league_remark
        } = ctx.req.body;
        const updateLeague = (league_id, league_name, league_remark) => ctx.service.backstage.league.updateLeague({league_id, league_name, league_remark});
        const leagueResult = await updateLeague(league_id, league_name, league_remark);

        if (leagueResult) {
            this.success(null, '更新成功');
            return;
        }
        this.failed(null, '更新失败', 500);
    }
}

module.exports = BackstageLeagueController;