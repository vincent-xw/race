
/* eslint-disable fecs-camelcase */
/**
 * @file 比赛相关
 * @author Vincent
 */

'use strict';

const Controller = require('../core/base.controller');

class RaceController extends Controller {
    /**
     *创建比赛
     * @memberof RaceController
     */
    async addRace() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'league_id',
            'league_name',
            'race_time',
            'horse_info'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            league_id,
            league_name,
            race_time,
            horse_info
        } = ctx.req.body;
        const raceInfo = {
            league_id,
            league_name,
            race_time,
            horse_info
        };
        const insertRace = raceInfo => ctx.service.backstage.race.insertRace(raceInfo);
        const raceResult = await insertRace(raceInfo);

        if (raceResult) {
            this.success(null, '创建成功');
            return;
        }
        this.failed(null, '创建失败', 500);
    }
    /**
     *获取比赛列表
     *
     * @memberof RaceController
     */
    async getRaceList() {
        let {
            ctx
        } = this;
        // 无需检查参数毕传
        let {
            start_time = '',
            end_time = '',
            league_id = '',
            page_no = 1
        } = ctx.req.query;

        let searchParam = {
            start_time,
            end_time,
            league_id,
            page_no
        };
        let raceList = searchParam => ctx.service.backstage.race.getRaceList(searchParam);
        const raceResult = await raceList(searchParam);
        if (raceResult) {
            let data = {
                page_no,
                page_count: raceResult.count,
                page_size: 10,
                list_data: [raceResult.list]
            };
            this.success(data, '查询成功');
            return;
        }
        this.failed(null, '查询失败', 500);
    }
    /**
     *修改比赛信息
     *
     * @memberof RaceController
     */
    async modifyRace() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id,
            league_id,
            league_name,
            race_time,
            horse_info
        } = ctx.req.body;
        const raceInfo = {
            race_id,
            league_id,
            league_name,
            race_time,
            horse_info
        };
        const modifyRace = raceInfo => ctx.service.backstage.race.updateRaceById(raceInfo);
        const raceResult = await modifyRace(raceInfo);

        if (raceResult === 0) {
            this.success(null, '修改成功');
            return;
        }
        else if (raceResult === 1) {
            this.failed(null, '当前状态不允许修改比赛信息', 500);
            return;
        }
        this.failed(null, '修改失败', 500);
    }
    /**
     *修改单个马匹信息
     *
     * @memberof RaceController
     */
    async modifyRaceHorse() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id',
            'horse_id',
            'horse_name',
            'horse_status',
            'head_limit',
            'foot_limit'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id,
            horse_id,
            horse_name,
            horse_status,
            head_limit,
            foot_limit
        } = ctx.req.body;
        const horse_info = {
            race_id,
            horse_id,
            horse_name,
            horse_status,
            head_limit,
            foot_limit
        };
        const modifyRaceHorse = horse_info => ctx.service.backstage.race.updateHorseById(horse_info);
        const raceResult = await modifyRaceHorse(horse_info);

        if (raceResult === 0) {
            this.success(null, '修改成功');
            return;
        }
        else if (raceResult === 1) {
            this.failed(null, '当前状态不允许修改马匹信息', 500);
            return;
        }
        this.failed(null, '修改失败', 500);
    }
    /**
     *删除比赛信息
     *
     * @memberof RaceController
     */
    async deleteRace() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id
        } = ctx.req.body;
        const raceInfo = {
            race_id
        };
        const deleteRace = raceInfo => ctx.service.backstage.race.deleteRaceById(raceInfo);
        const raceResult = await deleteRace(raceInfo);

        if (raceResult) {
            this.success(null, '删除成功');
            return;
        }
        else if (raceResult === 0) {
            this.failed(null, '当前比赛已发布不允许删除', 500);
            return;
        }
        this.failed(null, '删除失败', 500);
    }
    /**
     *开始比赛
     *
     * @memberof RaceController
     */
    async startRace() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id
        } = ctx.req.body;
        let raceInfo = {
            race_id
        };
        const startRace = raceInfo => ctx.service.backstage.race.startRaceStatusById(raceInfo);
        const raceResult = await startRace(raceInfo);

        if (raceResult) {
            this.success(null, '操作成功');
            return;
        }
        else if (raceResult === 0) {
            this.failed(null, '当前比赛已发布不允许重复发布', 500);
            return;
        }
        this.failed(null, '操作失败', 500);
    }
    /**
     *设置比赛赔率
     *
     * @memberof RaceController
     */
    async setOdds() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id',
            'head_odds',
            'foot_odds'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id,
            head_odds,
            foot_odds
        } = ctx.req.body;
        let raceInfo = {
            race_id,
            head_odds,
            foot_odds
        };
        const setOdds = raceInfo => ctx.service.backstage.race.setOddsById(raceInfo);
        const raceResult = await setOdds(raceInfo);

        if (raceResult === 1) {
            this.success(null, '操作成功');
            return;
        }
        else if (raceResult === 0) {
            this.failed(null, '当前比赛状态异常，不允许设置赔率', 500);
            return;
        }
        this.failed(null, '操作失败', 500);
    }
    /**
     *结束比赛
     *
     * @memberof RaceController
     */
    async endRace() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'race_id',
            'head_odds',
            'foot_odds',
            'horse_info'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            race_id
        } = ctx.req.body;
        let raceInfo = {
            race_id
        };
        const endRace = raceInfo => ctx.service.backstage.race.endRaceStatusById(raceInfo);
        const raceResult = await endRace(raceInfo);

        if (raceResult === 1) {
            this.success(null, '操作成功');
            return;
        }
        else if (raceResult === 0) {
            this.failed(null, '当前比赛已结束不允许重复结束', 500);
            return;
        }
        else if (raceResult === 2) {
            this.failed(null, '操作失败，参数缺失', 500);
            return;
        }
        this.failed(null, '操作失败', 500);
    }
}

module.exports = RaceController;
