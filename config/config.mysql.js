exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '1.1.1.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'raceadmin',
        // 密码
        password: 'Raceadmin@1',
        // 数据库名
        database: 'race'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
};
