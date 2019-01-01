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
            bet_start_time = '',
            bet_end_time = '',
            page_no = 1
        } = ctx.req.query;
        let agent_id = ctx.request.user;
        let searchParam = {
            bet_start_time,
            bet_end_time,
            page_no,
            agent_id
        };
        let betList = searchParam => ctx.service.front.bet.getBetList(searchParam);
        const betResult = await betList(searchParam);
        if (betResult) {
            let data = {
                page_no,
                page_count: Math.ceil(betResult.count / 10),
                page_size: 10,
                bet_list: betResult.list
            };
            this.success(data, '查询成功');
            return;
        }
        this.failed(null, '查询失败', 500);
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
            return;
        }
        else if (betResult === 2) {
            this.failed(null, '操作失败，未查询到比赛', 502);
        }
        else if (betResult === 3) {
            this.failed(null, '操作失败，有马匹的头投注数量超过限额，请刷新页面获取最新投注限额', 503);
        }
        else if (betResult === 4) {
            this.failed(null, '操作失败，有马匹的脚投注数量超过限额，请刷新页面获取最新投注限额', 504);
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