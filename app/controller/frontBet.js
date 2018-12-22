/* eslint-disable fecs-camelcase */
/**
 * @file 前台比赛controller
 */
'use strict';

const Controller = require('../core/base.controller');

class LeagueController extends Controller {
    /**
     *投注
     *
     * @memberof FrontLeagueController
     */
    async bet() {
        let {
          ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id',
            'agent_id',
            'bet_info'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id,
            agent_id,
            bet_info
        } = ctx.req.body;
        let betData = {
            race_id,
            agent_id,
            bet_info
        };
        const bet = betData => ctx.service.front.bet.doBet(betData);
        const betResult = await bet(betData);

        if (betResult) {
            this.success(betResult, '操作成功');
            return;
        }
        else if (betResult === 0) {
            this.failed(null, '操作失败，当前比赛允许投注', 500);
        }
        this.failed(null, '操作失败', 500);
    }
    /**
     *获取投注详情
     *
     * @memberof LeagueController
     */
    async betDetail() {
        
    }
}
module.exports = LeagueController;