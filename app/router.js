/**
 * @file 路由
 * @author Vincent
 */
'use strict';
module.exports = app => {
    const {
        router,
        controller
    } = app;
    // 前台Router
    // 登录校验
    router.post('/api/front/login', app.passport.authenticate('local'));
    router.get('/api/front/logout', controller.home.info);
};
