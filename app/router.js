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
        passport
    } = app;
    // 前台Router
    // 登录校验
    apiFrontRouter.post('/login', passport.authenticate('local', {successRedirect: '/api/front/authCallback'}));
    // 鉴权成功回调
    apiFrontRouter.all('/authCallback', controller.front.info);
    // 代理修改密码
    apiFrontRouter.get('/resetpwd', controller.front.info);

    apiFrontRouter.get('/logout', controller.front.info);
    // 后台Router
    apiBackStageRouter.post('/login', passport.authenticate('local', {successRedirect: '/api/backstage/authCallback'}));
    // 鉴权成功回调
    apiFrontRouter.all('/authCallback', controller.backstage.info);
};
