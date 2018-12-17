/* eslint-disable fecs-camelcase */
/**
 * @file race service
 * @author Vincent
 */
'use strict';

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
     *获取比赛列表
     *查询race表的比赛信息及horse表的马匹信息，如果比赛已发布或者已结束还需要一并计算投注结果
     * @param {*} raceData
     * @memberof RaceService
     */
    async getRaceList(raceData) {
        try {
            // 格式化参数数组获取有效信息
            for (const item in raceData) {
                if (raceData.hasOwnProperty(item) && raceData[item] === undefined) {
                    delete raceData[item];
                }
            }
            let query = 'select SQL_CALC_FOUND_ROWS * from race ';
            let options = '';
            if (raceData.start_time && raceData.end_time) {
                options += ' race_time between "'
                        + new Date(parseInt(raceData.start_time, 10)).toLocaleString()
                        + '" and "'
                        + new Date(parseInt(raceData.end_time, 10)).toLocaleString() +'"';
            }
            let league = '';
            if (raceData.league_id) {
                league += ' league_id = ' + raceData.league_id;
            }
            let limit = '';
            if (raceData.page_no) {
                let count = (raceData.page_no - 1) * 10;
                limit = 'limit 10 offset ' + count;
            }
            else {
                limit = 'limit 10 offset 0';
            }
            if (options !== '' || league !== '') {
                this.app.mysql.escape(query += ' where' + options + ' and ' + league + ' ' + limit);
            }
            else {
                query += ' ' + limit;
            }
            // console.log(query);
            let raceResult = await this.app.mysql.query(query);
            let receTableCount = await this.app.mysql.query('SELECT FOUND_ROWS();');

            return {
                list: raceResult,
                count: receTableCount[0]['FOUND_ROWS()']};
        }
        catch (error) {
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
    async startRaceStatusById(raceData) {
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
    /**
     *根据ID设置比赛赔率
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async setOddsById(raceData) {
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            // 如果当前状态是已发布
            if (race_info.race_status !== 1) {
                return 0;
            }
            let post = {
                head_odds: raceData.head_odds,
                foot_odds: raceData.foot_odds,
                race_status: 2
            };
            let setOdds = await this.app.mysql.update('race', post, {
                where: {
                    race_id: raceData.race_id
                }
            });
            return setOdds.affectedRows === 1 ? 1 : false;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *修改比赛为结束状态，并计算结算结果
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async endRaceStatusById(raceData) {
        
    }
}
module.exports = RaceService;
