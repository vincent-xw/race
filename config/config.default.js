'use strict';

let mysql = require('./config.mysql.js');

module.exports = appInfo => {
    const config = exports = {
        ...mysql,
        onerror: {
            json(err, ctx) {
                // json hander
                ctx.body = {
                    status: '500',
                    message: '请求异常，请稍后再试'
                };
                ctx.status = 500;
            }
        },
        security: {
            csrf: {
                enable: false
            }
        },
        passportLocal: {
            usernameField: 'username',
            passwordField: 'password'
        }
    };
    config.auth_cookie_name = 'race';
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1542903490839_3707';

    // add your config here
    config.middleware = ['notfoundHandler'];

    return config;
};