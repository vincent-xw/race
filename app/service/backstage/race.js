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
            let raceCountSql = 'SELECT COUNT(race_id) as count from race WHERE race_time = "' + this.app.moment(raceData.race_time).format('YYYY-MM-DD 00:00:00') + '"';
            let raceCount = await conn.query(raceCountSql);
            let count = raceCount[0].count + 1;
            let raceTableData = {
                league_id: raceData.league_id,
                race_time: new Date(raceData.race_time).toLocaleString(),
                race_name: raceData.league_name + '_比赛_' + new Date().toLocaleDateString(),
                race_order: '第' + count + '场比赛',
                race_status: 0
            };
            let race = await conn.insert('race', raceTableData);
            let horseTableData = [] = raceData.horse_info;
            horseTableData.map(item => {
                item.race_id = race.insertId;
                delete item.id;
            });
            await conn.insert('horse', horseTableData);
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
            let query = 'select SQL_CALC_FOUND_ROWS * from race inner join league on race.league_id = league.league_id ';
            let options = '';
            if (raceData.start_time && raceData.end_time) {
                options += ' race.race_time between "'
                        + new Date(parseInt(raceData.start_time, 10)).toLocaleDateString() + ' 00:00:00'
                        + '" and "'
                        + new Date(parseInt(raceData.end_time, 10)).toLocaleDateString() + ' 23:59:59' + '"';
            }
            let league = '';
            if (raceData.league_id) {
                league += ' and race.league_id = ' + raceData.league_id;
            }
            let raceStatus = '';
            if (raceData.race_status) {
                raceStatus += ' and race.race_status = ' + raceData.race_status;
            }
            let limit = '';
            if (raceData.page_no) {
                let count = (raceData.page_no - 1) * 10;
                limit = ' limit 10 offset ' + count;
            }
            else {
                limit = ' limit 10 offset 0';
            }
            if (options !== '' || league !== '') {
                this.app.mysql.escape(query += ' where' + options  + league + raceStatus + limit);
            }
            else {
                this.app.mysql.escape(query += ' ' + limit);
            }
            // console.log(query);
            let raceResult = await this.app.mysql.query(query);
            let receTableCount = await this.app.mysql.query('SELECT FOUND_ROWS();');            
            return {
                list: raceResult,
                count: receTableCount[0]['FOUND_ROWS()']
            };
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *获取比赛详情
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async getRaceInfo(raceData) {
        try {
            let post = {
                race_id: raceData.race_id
            };
            let raceResult = await this.app.mysql.get('race', post);
            let horseResult = await this.app.mysql.select('horse', {
                where: {
                    ...post,
                    horse_status: 0
                }
            });
            let sql = 'select DISTINCT(bet.bet_id), username, horse_name,\
                         bet_head, bet_foot, bet_time, all_count, win_count\
                         from bet left join agent on bet.agent_id = agent.id \
                         left join horse on bet.horse_id = horse.horse_id where bet.race_id = ' + raceData.race_id;
            let betResult = await this.app.mysql.query(sql);
            return {
                ...raceResult,
                horse_info: horseResult,
                bet_info: betResult
            };
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
        let conn = await this.app.mysql.beginTransaction();
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            if (race_info.race_status !== 0) {
                return 2;
            }
            let raceTableData = {
                league_id: raceData.league_id,
                race_time: this.app.moment(raceData.race_time).format('YYYY-MM-DD H:m:s'),
                race_name: raceData.race_name,
                updated_time: this.app.moment().format('YYYY-MM-DD H:m:s')
            };
            for (const item in raceTableData) {
                if (raceTableData.hasOwnProperty(item) && raceTableData[item] === undefined) {
                    delete raceTableData[item];
                }
            }
            await conn.update('race', raceTableData, {
                where: {
                    race_id: raceData.race_id
                }
            });
            await conn.delete('horse', {
                race_id: raceData.race_id
            });
            let horseTableData = [] = raceData.horse_info;
            horseTableData.map(item => {
                item.race_id = raceData.race_id;
                delete item.horse_id;
            });
            await conn.insert('horse', horseTableData);
            await conn.commit();
            return true;
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
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            // 如果当前状态是已结束
            if (race_info.race_status !== 0) {
                return 0;
            }
            let post = {
                race_status: 1,
                updated_time: this.app.moment().format('YYYY-MM-DD H:m:s')
            };
            let race = await this.app.mysql.update('race', post, {
                where: {
                    race_id: raceData.race_id
                }
            });
            return race.affectedRows === 1;
        } catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
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
                first_head_odds: raceData.first_head_odds,
                first_foot_odds: raceData.first_foot_odds,
                second_foot_odds: raceData.second_foot_odds,
                third_foot_odds: raceData.third_foot_odds,
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
     *根据马匹ID设定成绩并且更新投注表里面的赢钱
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async setScoreById(raceData) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            let race_info = await conn.get('race', {
                race_id: raceData.race_id
            });
            // 获取赔率信息
            let first_head_odds = race_info.first_head_odds;
            let first_foot_odds = race_info.first_foot_odds;
            let second_foot_odds = race_info.second_foot_odds;
            let third_foot_odds = race_info.third_foot_odds;
            // 如果当前状态是已发布
            if (race_info.race_status === 0) {
                return 0;
            }
            else if (race_info.race_status === 1) {
                return 1;
            }
            let post = {
                'horse_score': raceData.horse_score
            };
            // 更新马匹成绩
            await conn.update('horse', post, {
                where: {
                    horse_id: raceData.horse_id
                }
            });
            // 如果是第一名则计算成绩并且更新头投注
            // 获取本场比赛该马匹的投注情况
            let betInfo = await conn.select('bet', {
                where: {
                    race_id: raceData.race_id,
                    horse_id: raceData.horse_id
                }
            });
            if (+raceData.horse_score === 1) {
                for (let index = 0; index < betInfo.length; index++) {
                    const element = betInfo[index];
                    element.head_win_count = element.bet_head * first_head_odds;
                    element.win_count += element.head_win_count;
                    let post = {
                        ...element
                    };
                    delete post.id;
                    await conn.update('bet', post, {
                        where: {
                            bet_id: element.bet_id
                        }
                    });
                }
            }
            // 如果是第二名则计算成绩并更新脚投注
            if (+raceData.horse_score === 2) {
                for (let index = 0; index < betInfo.length; index++) {
                    const element = betInfo[index];
                    element.foot_win_count = element.bet_foot * second_foot_odds;
                    element.win_count += element.foot_win_count;
                    let post = {
                        ...element
                    };
                    delete post.id;
                    await conn.update('bet', post, {
                        where: {
                            bet_id: element.bet_id
                        }
                    });
                }
            }
            // 如果是第三名则计算成绩并更新脚投注
            if (+raceData.horse_score === 3) {
                for (let index = 0; index < betInfo.length; index++) {
                    const element = betInfo[index];
                    element.foot_win_count = element.bet_foot * third_foot_odds;
                    element.win_count += element.foot_win_count;
                    let post = {
                        ...element
                    };
                    delete post.id;
                    await conn.update('bet', post, {
                        where: {
                            bet_id: element.bet_id
                        }
                    });
                }
            }
            conn.commit();
            return true;
        }
        catch (error) {
            await conn.rollback();
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
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            // 如果当前状态是已发布
            if (race_info.race_status !== 2) {
                return 0;
            }
            let post = {
                race_status: 3
            };
            let changeStatus = await this.app.mysql.update('race', post, {
                where: {
                    race_id: raceData.race_id
                }
            });
            return changeStatus.affectedRows === 1 ? 1 : false;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *根据ID删除投注信息
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async deleteBetById(raceData) {
        try {
            let deleteStatus = await this.app.mysql.delete('bet', {
                bet_id: raceData.bet_id
            });
            return deleteStatus.affectedRows === 1;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *发布成绩
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async releaseScoreById(raceData) {
        try {
            let race_info = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            // 如果当前状态是已设置赔率
            if (race_info.race_status !== 3) {
                return 2;
            }

            let post = {
                race_status: 4
            };
            let changeStatus = await this.app.mysql.update('race', post, {
                where: {
                    race_id: raceData.race_id
                }
            });
            return changeStatus.affectedRows === 1 ? 1 : false;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}
module.exports = RaceService;
