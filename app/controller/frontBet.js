/* eslint-disable fecs-camelcase */
/**
 * @file 前台比赛controller
 */
'use strict';

const Controller = require('../core/base.controller');

class LeagueController extends Controller {
    /**
     *获取投注列表
     *
     * @memberof LeagueController
     */
    async betList() {
        let {
            ctx
        } = this;
        let {
            
        } = ctx.req.body;
    }
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
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'bet_id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            bet_id
        } = ctx.req.body;
        const betDetail = bet_id => ctx.service.front.bet.getBetDetail({bet_id});
        const betResult = await betDetail(bet_id);

        if (betResult) {
            this.success(betResult, '查询成功');
            return;
        }
        this.failed(null, '查询失败', 500);
    }
}
module.exports = LeagueController;