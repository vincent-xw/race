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
            let query = 'select SQL_CALC_FOUND_ROWS * from bet ';
            let options = '';
            if (betData.bet_start_time && betData.bet_end_time) {
                options += ' bet_time between "'
                        + new Date(parseInt(betData.bet_start_time, 10)).toLocaleString()
                        + '" and "'
                        + new Date(parseInt(betData.bet_end_time, 10)).toLocaleString() + '"';
            }
            let limit = '';
            if (betData.page_no) {
                let count = (betData.page_no - 1) * 10;
                limit = 'limit 10 offset ' + count;
            }
            else {
                limit = 'limit 10 offset 0';
            }
            if (options !== '') {
                this.app.mysql.escape(query += ' where' + options + ' ' + limit);
            }
            else {
                query += ' ' + limit;
            }
            // console.log(query);
            let betResult = await this.app.mysql.query(query);
            let betTableCount = await this.app.mysql.query('SELECT FOUND_ROWS();');

            return {
                list: betResult,
                count: betTableCount[0]['FOUND_ROWS()']};
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
                    horse_id: element.horse_id,
                    agent_id: betData.agent_id,
                    bet_time,
                    all_count: (+element.bet_head + element.bet_foot) * this.config.sys.ticket
                });
            }
            let betResult = await this.app.mysql.insert('bet', post);
            if (betResult) {
                return {
                    bet_id
                };
            }
            return false;
        }
        catch (error) {
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
            let post = {
                bet_id: betData.bet_id
            };
            let betDetailResult = await this.app.mysql.get('bet', post);
            if (betDetailResult || betDetailResult === null) {
                return betDetailResult === null ? {
                    bet_detail: {}
                } : {
                    bet_detail: betDetailResult
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