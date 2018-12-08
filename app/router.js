/**
 * @file 路由
 * @author Vincent
 */
'use strict';
module.exports = app => {
    const apiFrontRouter = app.router.namespace('/api/front');
    // const apiBackStageRouter = app.router.namespace('/api/backstage');
    const {
        controller,
        passport
    } = app;
    // 前台Router
    // 登录校验
    apiFrontRouter.post('/', passport.authenticate('local'), controller.home.info);
    apiFrontRouter.post('/login', passport.authenticate('local'));
    apiFrontRouter.get('/logout', controller.home.info);
};
