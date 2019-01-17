/* eslint-disable fecs-camelcase */
/**
 * @file 统计service
 * @author Vincent
 */
'use strict';

const Service = require('egg').Service;

class StatService extends Service {
    async getStat(statData) {
        try {
            let {
                start_time = this.app.moment(),
                end_time = this.app.moment().format('YYYY-01-01'),
                league_id = '',
                type = 'year'
            } = statData;
            // 获取时间参数
            start_time = this.app.moment.isMoment(start_time) ? start_time : this.app.moment(start_time);
            end_time = this.app.moment.isMoment(end_time) ? end_time : this.app.moment(end_time);
            // 格式化时间参数
            start_time = type === 'year' ? start_time.startOf('year').format('YYYY-MM-DD 00:00:00')
                        : type === 'month' ? start_time.startOf('month').format('YYYY-MM-DD 00:00:00')
                        : start_time.startOf('day').format('YYYY-MM-DD 00:00:00');
            end_time = type === 'year' ? end_time.endOf('year').format('YYYY-MM-DD 23:59:59')
                        : type === 'month' ? end_time.endOf('month').format('YYYY-MM-DD 23:59:59')
                        : end_time.endOf('day').format('YYYY-MM-DD 23:59:59');
            let formatStr = type === 'year' ? '%Y' : type === 'month' ? '%Y%m' : '%Y%m%d';
            let fields = 'DATE_FORMAT(bet_time,\''
                        + formatStr + '\') AS bet_time, sum(all_count) AS all_count, sum(win_count) AS win_count';
            let sqlQuery = 'from bet left join league on bet.league_id = league.league_id where bet_time between \''
                            + start_time + '\' and \'' + end_time + '\'';
            if (league_id) {
                fields += ', league_name ';
                sqlQuery += ' and league.league_id = ' + league_id;
            }
            sqlQuery = 'select ' + fields + ' ' + sqlQuery + ' GROUP BY DATE_FORMAT(bet_time,\'' + formatStr + '\')';
            let statResult = await this.app.mysql.query(sqlQuery);
            return {
                list: statResult
            };
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}

module.exports = StatService;
