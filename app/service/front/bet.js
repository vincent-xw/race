/**
 * @file bet service
 * @author Vincent
 */
const Service = require('egg').Service;

class BetService extends Service {
    /**
     *获取投注列表
     *
     * @memberof BetService
     */
    async getBetList(betData) {
        try {
            // 格式化参数数组获取有效信息
            for (const item in betData) {
                if (betData.hasOwnProperty(item) && betData[item] === undefined) {
                    delete betData[item];
                }
            }
            let query = 'select SQL_CALC_FOUND_ROWS DISTINCT bet_id, race_name, bet_time from bet left join race on bet.race_id = race.race_id ';
            let options = '';
            if (betData.bet_start_time && betData.bet_end_time) {
                options += ' bet_time between "'
                        + new Date(parseInt(betData.bet_start_time, 10)).toLocaleDateString() + ' 00:00:00'
                        + '" and "'
                        + new Date(parseInt(betData.bet_end_time, 10)).toLocaleDateString() + ' 23:59:59' + '"';
            }
            let agent = '';
            if (betData.agent_id) {
                agent += ' and agent_id = ' + betData.agent_id;
            }
            let limit = '';
            if (betData.page_no) {
                let count = (betData.page_no - 1) * 10;
                limit = ' limit 10 offset ' + count;
            }
            else {
                limit = ' limit 10 offset 0';
            }
            if (options !== '') {
                this.app.mysql.escape(query += ' where' + options + agent + limit );
            }
            else {
                this.app.mysql.escape(query += ' ' + limit );
            }
            // console.log(query);
            let betResult = await this.app.mysql.query(query);
            let betTableCount = await this.app.mysql.query('SELECT FOUND_ROWS();');

            return {
                list: betResult,
                count: betTableCount[0]['FOUND_ROWS()']
            };
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *投注比赛
     *
     * @memberof BetService
     */
    async doBet(betData) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            let raceResult = await this.app.mysql.get('race', {
                race_id: betData.race_id
            });
            if (raceResult === null) {
                return 2;
            }
            if (raceResult.race_status !== 1) {
                return 0;
            }
            let post = [];
            let bet_id = new Date().getTime();
            let bet_time = this.app.moment().format('YYYY-MM-DD H:m:s');
            for (let index = 0; index < betData.bet_info.length; index++) {
                const element = betData.bet_info[index];
                element.bet_head = element.bet_head || 0;
                element.bet_foot = element.bet_foot || 0;
                post.push({
                    bet_id,
                    bet_head: element.bet_head,
                    bet_foot: element.bet_foot,
                    race_id: betData.race_id,
                    league_id: betData.league_id,
                    horse_id: element.horse_id,
                    agent_id: betData.agent_id,
                    bet_time,
                    all_count: (parseInt(element.bet_head) + parseInt(element.bet_foot)) * this.config.sys.ticket
                });
                let horse_info = await conn.get('horse', {
                    horse_id: element.horse_id
                });
                let head_left_limit = horse_info.head_limit - element.bet_head;
                let foot_left_limit = horse_info.foot_limit - element.bet_foot;
                if (head_left_limit < 0) {
                    // 当某个马匹的头可投注数量不足是拒绝投注
                    return 3;
                }
                if (foot_left_limit < 0) {
                    // 当某个马匹的脚可投注数量不足是拒绝投注
                    return 4;
                }
                let horse_post = {
                    head_left_limit: head_left_limit,
                    foot_left_limit: foot_left_limit
                };
                // 更新马匹可投注数量
                await conn.update('horse', horse_post, {
                    where: {
                        horse_id: element.horse_id
                    }
                });
            }
            await conn.insert('bet', post);
            let betResult = await conn.commit();
            if (betResult) {
                return {
                    bet_id
                };
            }
            return false;
        }
        catch (error) {
            await conn.rollback();
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *获取投注详情
     *
     * @param {*} betData
     * @memberof BetService
     */
    async getBetDetail(betData) {
        try {
            let query = 'select * from bet left join horse on bet.horse_id = horse.horse_id where bet.bet_id = '
                        + betData.bet_id;
            let betDetailResult = await this.app.mysql.query(query);
            if (betDetailResult || betDetailResult !== null) {
                let raceResult = {};
                if (betDetailResult.length !== 0) {
                    let race_id = betDetailResult[0].race_id;

                    raceResult = await this.app.mysql.get('race', {
                        race_id
                    });
                }
                let bet_detail = [];
                betDetailResult.map(item => {
                    bet_detail.push({
                        ...item,
                        race_info: {
                            ...raceResult
                        }
                    });
                });
                return {
                    bet_detail: bet_detail
                };
            }
            return false;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}
module.exports = BetService;