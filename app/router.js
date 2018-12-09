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
    const token = middleware.token();
    // 前台Router
    // 登录校验
    apiFrontRouter.post('/login', controller.front.login);
    // 代理修改密码
    apiFrontRouter.get('/resetpwd', token, controller.front.info);

    apiFrontRouter.get('/logout', token, controller.front.info);
    // 后台Router
    apiBackStageRouter.post('/login', passport.authenticate('local', {successRedirect: '/api/backstage/authCallback'}));
    // 鉴权成功回调
    apiBackStageRouter.all('/authCallback', controller.backstage.info);
    // 注销
    apiBackStageRouter.get('/logout', controller.backstage.info);
    // 获取比赛列表
    apiBackStageRouter.get('/race/list', controller.backstage.getRaceList)
};
