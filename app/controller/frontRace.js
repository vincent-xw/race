/* eslint-disable fecs-camelcase */
/**
 * @file 前台比赛controller
 */
'use strict';

const Controller = require('../core/base.controller');

class LeagueController extends Controller {
    /**
     *获取比赛list
     *
     * @memberof FrontLeagueController
     */
    async list() {
        let {
          ctx
        } = this;
        // 检查参数毕传
        let query = [
            'league_id'
        ];
        if (!this.requireCheck(query, 'get')) {
            return;
        }
        let {
            league_id
        } = ctx.req.query;
        let raceData = {
            league_id
        };
        const getRaceList = raceData => ctx.service.front.race.getRaceList(raceData);
        const raceListResult = await getRaceList(raceData);

        if (raceListResult) {
            this.success(raceListResult, '查询成功');
            return;
        }
        this.failed(null, '查询失败', 500);
    }
}
module.exports = LeagueController;