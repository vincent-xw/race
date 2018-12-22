/**
 * @file bet service
 * @author Vincent
 */
const Service = require('egg').Service;

class BetService extends Service {
    /**
     *获取比赛列表
     *
     * @memberof BetService
     */
    async doBet(betData) {
        try {
            let raceResult = await this.app.mysql.get('race', {
                race_id: betData.race_id
            });
            if (raceResult.race_status !== 1) {
                return 0;
            }
            let post = [];
            let bet_id = new Date().getTime();
            let bet_time = new Date().toLocaleDateString();
            for (let index = 0; index < betData.bet_info.length; index++) {
                const element = betData.bet_info[index];
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
}
module.exports = BetService;