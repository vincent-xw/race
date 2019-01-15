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
                league_id = '1',
                stat_type = 'year'
            } = statData;
            // 获取时间参数
            start_time = this.app.moment.isMoment(start_time) ? start_time : this.app.moment(start_time);
            end_time = this.app.moment.isMoment(end_time) ? end_time : this.app.moment(end_time);
            // 格式化时间参数
            start_time = stat_type === 'year' ? start_time.startOf('year').format('YYYY-MM-DD 00:00:00') : stat_type === 'month' ? start_time.startOf('month').format('YYYY-MM-DD 00:00:00')
                        : start_time.startOf('day').format('YYYY-MM-DD 00:00:00');
            end_time = stat_type === 'year' ? end_time.endOf('year').format('YYYY-MM-DD 23:59:59') : stat_type === 'month' ? end_time.endOf('month').format('YYYY-MM-DD 23:59:59')
                        : end_time.endOf('day').format('YYYY-MM-DD 23:59:59');
            let formatStr = stat_type === 'year' ? '%Y' : stat_type === 'month' ? '%Y%m' : '%Y%m%d';
            let fields = 'DATE_FORMAT(bet_time,\'' + formatStr + '\') AS bet_time, sum(all_count) AS all_count, sum(win_count) AS win_count';
            let sqlQuery = 'from bet where bet_time between \'' + start_time + '\' and \'' + end_time + '\''; 
            if (league_id) {
                fields += ', league_id ';
                sqlQuery += ' and league_id = ' + league_id;
            }
            sqlQuery = 'select ' + fields + ' ' + sqlQuery + ' GROUP BY DATE_FORMAT(bet_time,\'' + formatStr + '\')';
            
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}

module.exports = StatService;
