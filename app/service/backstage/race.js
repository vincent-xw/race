/* eslint-disable fecs-camelcase */
/**
 * @file race service
 * @author Vincent
 */

const Service = require('egg').Service;

class RaceService extends Service {
    /**
     *添加比赛
     *
     * @memberof RaceService
     */
    async insertRace(raceData) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            // this.checkRaceData(raceData, 'insert');
            let raceTableData = {
                league_id: raceData.league_id,
                race_time: new Date(raceData.race_time).toLocaleString(),
                race_name: raceData.league_name + '_比赛_' + new Date().toLocaleDateString(),
                created_time: new Date().toLocaleString(),
                updated_time: new Date().toLocaleString(),
                race_status: 0
            };
            let race = await conn.insert('race', raceTableData);
            let horseTableData = [] = raceData.horse_info;
            horseTableData.map(item => {
                item.race_id = race.insertId;
            });
            conn.insert('horse', horseTableData);
            await conn.commit(); // 提交事务
            return true;
        }
        catch (error) {
            await conn.rollback();
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *修改比赛
     *
     * @param {*} raceData
     * @returns
     * @memberof RaceService
     */
    async updateRaceById(raceData) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            if (race_info.race_status !== 0) {
                return 1;
            }
            let raceTableData = {
                league_id: raceData.league_id,
                race_time: new Date(raceData.race_time).toLocaleString(),
                race_name: raceData.race_name,
                updated_time: new Date().toLocaleString()
            };
            for (const item in raceTableData) {
                if (raceTableData.hasOwnProperty(item) && raceTableData[item] === undefined) {
                    delete raceTableData[item];
                }
            }
            await conn.update('race', raceTableData, {
                where: {
                    race_id: raceTableData.race_id
                }
            });
            await conn.commit(); // 提交事务
            return 0;
        }
        catch (error) {
            await conn.rollback();
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *修改马匹
     *
     * @param {*} horseData
     * @returns
     * @memberof HorseService
     */
    async updateHorseById(horseData) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: horseData.race_id
            });
            if (race_info.race_status !== 0) {
                return 1;
            }
            let horseTableData = {
                horse_name: horseData.horse_name,
                horse_status: horseData.horse_status,
                head_limit: horseData.head_limit,
                foot_limit: horseData.foot_limit
            };
            await conn.update('horse', horseTableData, {
                where: {
                    horse_id: horseData.horse_id,
                    race_id: horseData.race_id
                }
            });
            await conn.commit(); // 提交事务
            return 0;
        }
        catch (error) {
            await conn.rollback();
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *删除比赛
     *
     * @param {*} raceData
     * @returns
     * @memberof RaceService
     */
    async deleteRaceById(raceData) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            if (race_info.race_status !== 0) {
                return 0;
            }
            await conn.delete('race', {
                race_id: raceData.race_id
            });
            await conn.delete('horse', {
                race_id: raceData.race_id
            });
            await conn.commit(); // 提交事务
            return true;
        }
        catch (error) {
            await conn.rollback();
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *修改比赛为开始状态
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async startRaceStatusById(raceData, way) {
        let race_info = await this.app.mysql.get('race', {
            race_id: raceData.race_id
        });
        // 如果当前状态是已结束
        if (race_info.race_status !== 0) {
            return 0;
        }
        let post = {
            race_status: 1,
            updated_time: new Date().toLocaleString()
        };
        let race = await this.app.mysql.update('race', post, {
            where: {
                race_id: raceData.race_id
            }
        });
        return race.affectedRows === 1;
    }
}
module.exports = RaceService;
