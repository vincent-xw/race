
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
     *修改比赛信息
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
}

module.exports = RaceController;
