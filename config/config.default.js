'use strict';

let mysql = require('./config.mysql.js');

module.exports = appInfo => {
    const config = exports = {
        ...mysql
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1542903490839_3707';

    // add your config here
    config.middleware = [];

    return config;
};
