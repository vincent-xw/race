/* eslint-disable fecs-camelcase */
/**
 * @file agent Controller
 * @author Vincent
 */
'use strict';

const Controller = require('../core/base.controller');

class AgentController extends Controller {
    /**
     *添加代理
     *
     * @memberof AgentController
     */
    async addAgent() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'agent_name',
            'agent_password'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            agent_name,
            agent_password,
            agent_phone = '',
            agent_wechat = '',
            agent_remark = ''
        } = ctx.req.body;
        const agentInfo = {
            agent_name,
            agent_password,
            agent_phone,
            agent_wechat,
            agent_remark
        };
        const insertAgent = agentInfo => ctx.service.backstage.agent.insertAgent(agentInfo);
        const agentResult = await insertAgent(agentInfo);

        if (agentResult) {
            this.success(null, '创建成功');
            return;
        }
        this.failed(null, '创建失败', 500);
    }
    /**
     *更新代理
     *
     * @returns
     * @memberof AgentController
     */
    async modifyAgent() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            id,
            agent_name,
            agent_password,
            agent_phone,
            agent_wechat,
            agent_remark
        } = ctx.req.body;

        const agentInfo = {
            id,
            username: agent_name,
            password: agent_password,
            agent_phone,
            agent_wechat,
            agent_remark
        };

        const updateAgent = agentInfo => ctx.service.backstage.agent.updateAgent(agentInfo);
        const agentResult = await updateAgent(agentInfo);

        if (agentResult) {
            this.success(null, '更新成功');
            return;
        }
        this.failed(null, '更新失败', 500);
    }
    /**
     *获取代理列表
     *
     * @memberof AgentController
     */
    async getAgentList() {
        let {
            ctx
        } = this;
        const agentList = () => ctx.service.backstage.agent.getAgentList();
        const agentResult = await agentList();

        if (agentResult) {
            this.success(agentResult, '获取成功');
            return;
        }
        this.failed(null, '获取失败', 500);
    }
    /**
     *删除联赛
     *
     * @returns
     * @memberof AgentController
     */
    async removeAgent() {
        let {
            ctx
        } = this;
        // 检查参数毕传
        let query = [
            'id'
        ];
        if (!this.requireCheck(query)) {
            return;
        }
        let {
            id
        } = ctx.req.body;
        const removeAgent = id => ctx.service.backstage.agent.removeAgentByAgentID(id);
        const agentResult = await removeAgent(id);

        if (agentResult) {
            this.success(null, '删除成功');
            return;
        }
        this.failed(null, '删除失败', 500);

    }
}

module.exports = AgentController;