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
    // 登录
    apiBackStageRouter.post('/login', controller.backstageBasic.login);
    // 注销
    apiBackStageRouter.get('/logout', controller.backstageBasic.logout);  
    // 联赛相关
    // 新增联赛
    apiBackStageRouter.post('/league/add', token, controller.backstageLeague.addLeague);
    // 更新联赛
    apiBackStageRouter.post('/league/update', token, controller.backstageLeague.modifyLeague);
    // 获取联赛列表
    apiBackStageRouter.get('/league/list', token, controller.backstageLeague.getLeagueList);
    // 删除联赛记录
    apiBackStageRouter.post('/league/delete', token, controller.backstageLeague.removeLeague);   
    // 代理相关
    // 新增代理
    apiBackStageRouter.post('/agent/add', token, controller.backstageAgent.addAgent);
    // 更新代理
    apiBackStageRouter.post('/agent/update', token, controller.backstageAgent.modifyAgent);
    // 获取代理列表
    apiBackStageRouter.get('/agent/list', token, controller.backstageAgent.getAgentList);
    // 删除代理记录
    apiBackStageRouter.post('/agent/delete', token, controller.backstageAgent.removeAgent);
    // 比赛相关
    // 创建比赛
    apiBackStageRouter.post('/race/add', token, controller.backstageRace.addRace);
    // 修改比赛
    apiBackStageRouter.post('/race/update', token, controller.backstageRace.modifyRace);
    // 修改马匹信息
    apiBackStageRouter.post('/race/horse/update', token, controller.backstageRace.modifyRaceHorse);
    // 删除比赛
    apiBackStageRouter.post('/race/delete', token, controller.backstageRace.deleteRace);
    // 开始比赛
    apiBackStageRouter.post('/race/start', token, controller.backstageRace.startRace);
    // 获取比赛列表
    apiBackStageRouter.get('/race/list', token, controller.backstageRace.getRaceList);
    // 设置赔率
    apiBackStageRouter.get('/race/setOdds', token, controller.backstageRace.setOdds);
};
