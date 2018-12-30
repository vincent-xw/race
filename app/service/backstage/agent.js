/**
 * @file agent service
 * @author Vincent
 */
const Service = require('egg').Service;

class AgentService extends Service {
    /**
     * 插入新的代理数据
     */
    async insertAgent(agentData) {
        try {
            let agent = await this.app.mysql.insert('agent', {
                username: agentData.agent_name,
                password: agentData.agent_password,
                created_time: this.app.moment().format('YYYY-MM-DD H:m:s'),
                updated_time: this.app.moment().format('YYYY-MM-DD H:m:s'),
                agent_phone: agentData.agent_phone,
                agent_wechat: agentData.agent_wechat,
                agent_remark: agentData.agent_remark
            });

            return agent.affectedRows === 1;
        } catch (error) {
            if (error.sqlState === '23000') {
                return 3;
            }
            this.ctx.logger.error(new Error(error));
            return false;
        }

    }
    /**
     *根据id更新代理数据
     *
     * @memberof BackstageAgentService
     */
    async updateAgent(agentData) {
        try {
            let post = {
                ...agentData,
                'updated_time': this.app.moment().format('YYYY-MM-DD H:m:s')
            };
            for (const item in post) {
                if (post.hasOwnProperty(item) && post[item] === undefined) {
                    delete post[item];
                }
            }
            let agent = await this.app.mysql.update('agent', post);
            return agent.affectedRows === 1 || agent.affectedRows === 0;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *获取代理列表
     *
     * @memberof BackstageAgentService
     */
    async getAgentList() {
        try {
            let agent = await this.app.mysql.select('agent');
            let agentList = [];
            for (let index = 0; index < agent.length; index++) {
                const element = agent[index];
                agentList.push({
                    id: element.id,
                    agent_name: element.username,
                    agent_phone: element.agent_phone,
                    agent_wechat: element.agent_wechat,
                    agent_remark: element.agent_remark
                });
            }
            return {
                agent_list: agentList
            };
        } catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
    /**
     *移除代理记录
     *
     * @memberof BackstageAgentService
     */
    async removeAgentByAgentID(agentId) {
        try {
            const options = {
                id: agentId
            };
            let agent = await this.app.mysql.delete('agent', options);
            return agent.affectedRows === 1;
        }
        catch (error) {
            this.ctx.logger.error(new Error(error));
            return false;
        }
    }
}

module.exports = AgentService;