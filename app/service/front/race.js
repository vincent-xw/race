/**
 * @file race service
 * @author Vincent
 */
const Service = require('egg').Service;

class RaceService extends Service {
    /**
     *获取联赛列表
     *
     * @memberof RaceService
     */
    async getRaceList(leagueData) {
        try {
            let raceResult = await this.app.mysql.select('race', {
                where: {
                    league_id: leagueData.league_id
                }
            });
            if (raceResult) {
                return {
                    race_list: raceResult
                };
            }
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}
module.exports = RaceService;