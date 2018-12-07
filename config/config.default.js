'use strict';

let mysql = require('./config.mysql.js');

module.exports = appInfo => {
    const config = exports = {
        // ...mysql
        onerror: {
            all(err, ctx) {
                // 在此处定义针对所有响应类型的错误处理方法
                // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
                ctx.body = 'error';
                ctx.status = 500;
            },
            html(err, ctx) {
                // html hander
                ctx.body = '<h3>error</h3>';
                ctx.status = 500;
            },
            json(err, ctx) {
                // json hander
                ctx.body = {
                    message: 'error'
                };
                ctx.status = 500;
            },
            jsonp(err, ctx) {
                // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
            },
        }
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1542903490839_3707';

    // add your config here
    config.middleware = ['notfoundHandler'];

    return config;
};