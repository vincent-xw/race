/**
 * @file 路由
 * @author Vincent
 */
'use strict';
module.exports = app => {
    const apiFrontRouter = app.router.namespace('/api/front');
    const apiBackStageRouter = app.router.namespace('/api/backstage');
    const {
        controller,
        passport,
        middleware
    } = app;

    // 鉴权中间件
    const token = middleware.token();
    // 前台Router
    // 登录校验
    apiFrontRouter.post('/login', controller.front.login);
    // 代理修改密码
    // apiFrontRouter.get('/resetpwd', token, controller.front.info);

    // apiFrontRouter.get('/logout', token, controller.front.info);
    // 后台Router
    apiBackStageRouter.post('/login', controller.backstageBasic.login);
    // 注销
    apiBackStageRouter.get('/logout', controller.backstageBasic.logout);
    // 新增联赛
    apiBackStageRouter.post('/league/add', controller.backstageLeague.addLeague);
};
