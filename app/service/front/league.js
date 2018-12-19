/**
 * @file agent service
 * @author Vincent
 */
const Service = require('egg').Service;

class LeagueService extends Service {
    /**
     *获取联赛列表
     *
     * @memberof LeagueService
     */
    async getLeagueList() {
        try {
            let leagueResult = await this.app.mysql.select('league');
            if (leagueResult) {
                return {
                    league_list: leagueResult
                };
            }
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}
module.exports = LeagueService;