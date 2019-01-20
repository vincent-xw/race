/**
 * @file race service
 * @author Vincent
 */
const Service = require('egg').Service;

class RaceService extends Service {
    /**
     *获取比赛列表
     *
     * @memberof RaceService
     */
    async getRaceList(leagueData) {
        try {
            let searchQuery = {
                league_id: leagueData.league_id,
                race_time: this.app.moment().format('YYYY-MM-DD 00:00:00'),
                race_status: 1
            };
            let raceResult = await this.app.mysql.select('race', {
                where: searchQuery
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
    /**
     *获取比赛详情
     *
     * @param {*} raceData
     * @memberof RaceService
     */
    async getRaceInfo(raceData) {
        try {
            let raceResult = await this.app.mysql.get('race', {
                race_id: raceData.race_id
            });
            let horseInfo = await this.app.mysql.select('horse', {
                where: {
                    race_id: raceData.race_id
                }
            });
            if (raceResult && horseInfo) {
                return {
                    race_info: {
                        ...raceResult,
                        horseInfo
                    }
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