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
                'created_time': this.app.moment().format('YYYY-MM-DD H:m:s'),
                'updated_time': this.app.moment().format('YYYY-MM-DD H:m:s')
            });
            return league.affectedRows === 1;
        } catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }

    }
    /**
     *根据id更新联赛数据
     *
     * @memberof BackstageLeagueService
     */
    async updateLeague(leagueData) {
        try {
            let post = {
                ...leagueData,
                'updated_time': this.app.moment().format('YYYY-MM-DD H:m:s')
            };
            for (const item in post) {
                if (post.hasOwnProperty(item) && item === 'league_id') {
                    delete post.league_id;
                }
                if (post.hasOwnProperty(item) && post[item] === undefined) {
                    delete post[item];
                }
            }
            
            const options = {
                where: {
                    'league_id': leagueData.league_id
                }
            };
            let league = await this.app.mysql.update('league', post, options);
            return league.affectedRows === 1;
        } catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *获取联赛列表
     *
     * @memberof BackstageLeagueService
     */
    async getLeagueList() {
        try {
            let league = await this.app.mysql.select('league');
            return {
                league_list: league
            };
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *移除联赛记录
     *
     * @memberof BackstageLeagueService
     */
    async removeLeagueByLeagueID(leagueId) {
        try {
            const options = {
                league_id: leagueId
            };
            let league = await this.app.mysql.delete('league', options);
            return league.affectedRows === 1;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}
module.exports = BackstageLeagueService;