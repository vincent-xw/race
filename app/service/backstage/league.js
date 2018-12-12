/**
 * @file 赛区service
 * @author Vincent
 */
const Service = require('egg').Service;

class BackstageLeagueService extends Service {
    /**
     * 插入新的赛区数据
     */
    async insertLeague(leagueData) {
        try {
            let league = await this.app.mysql.insert('league', {
                'league_name': leagueData.league_name,
                'league_remark': leagueData.league_remark,
                'created_time': new Date().toLocaleString(),
                'updated_time': new Date().toLocaleString()
            });
            return league.affectedRows === 1;
        }
        catch (error) {
            this.ctx.logger.error(new Error('obj is not Array instance'));
            return false;
        }

    }
}
module.exports = BackstageLeagueService;