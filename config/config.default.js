'use strict';

let mysql = require('./config.mysql.js');

module.exports = appInfo => {
    const config = exports = {
        ...mysql,
        onerror: {
            json(err, ctx) {
                // json hander
                ctx.body = {
                    message: 'error'
                };
                ctx.status = 500;
            }
        }
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1542903490839_3707';

    // add your config here
    config.middleware = ['notfoundHandler'];

    return config;
};