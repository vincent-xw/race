## race 后台接口文档
| 接口名称 | 接口地址 | 备注 |
| ------ | ------ | ------ |
| 登录 | [``/api/backstage/login``](#登录) | 登录接口，无需鉴权 |
| 注销 | [``/api/backstage/logout``](#注销) | 注销接口 |
| 创建比赛 | [``/api/backstage/race/created``](#创建比赛) | 创建比赛，新建比赛 |
| 删除比赛 | [``/api/backstage/race/delete``](#删除比赛) | 删除比赛 |
| 获取比赛列表 | [``/api/backstage/race/list``](#获取比赛列表) | 获取比赛列表 |
| 修改比赛信息 | [``/api/backstage/race/update``](#修改比赛信息) | 修改比赛里面的基本信息，允许修改未开始的比赛 |
| 修改比赛状态 | [``/api/backstage/race/change``](#修改比赛状态) | 修改比赛状态 |
| 新增联赛 | [``/api/backstage/league/created``](#新增联赛) | 新增联赛 |
| 修改联赛 | [``/api/backstage/league/update``](#修改联赛) | 修改联赛信息基本信息及状态 |
| 联赛列表 | [``/api/backstage/league/list``](#联赛列表) | 联赛列表 |
| 删除联赛 | [``/api/backstage/league/delete``](#删除联赛) | 删除联赛 |
| 新增代理 | [``/api/backstage/agent/created``](#新增代理) | 新增代理 |
| 修改代理 | [``/api/backstage/agent/update``](#修改代理) | 修改代理基本信息及状态，密码 |
| 代理列表 | [``/api/backstage/agent/list``](#代理列表) | 代理列表 |
| 删除代理 | [``/api/backstage/agent/delete``](#删除代理) | 删除代理 |
| 报表统计 | [``/api/backstage/statistics/list``](#报表统计) | 获取比赛报表统计 |

### 登录 [返回顶部](#race 后台接口文档)

接口地址: ``/api/backstage/login``

入参: 
``username:string, password:string``

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```
可能的异常: 当用户名密码不正确或用户被限制登录等非正常登录情况，status非0切包含错误话术msg

### 注销 [返回顶部](#race 后台接口文档)

接口地址: ``/api/backstage/logout``

入参: 
无

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 创建比赛 [返回顶部](#race 后台接口文档)

接口地址: ``/api/backstage/race/created``

入参: 
```json
    {
        "league_id": "1",//string联赛ID，联赛接口返回的联赛列表中对应的联赛ID
        "horse_info": [
            {
                "horse_name":"string",//字符串，马匹名称
                "horse_status":0//number，马匹状态：0-可参赛，1-不可参赛
            }
        ]// 数组，马匹信息，里面的每个item都有一个对象，创建只需要传名称及状态
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 修改比赛状态 [返回顶部](#race 后台接口文档)

接口地址: ``/api/backstage/race/change``

入参: 
```json
    {
        "race_id": "1",// string比赛ID，每条比赛的状态进行更新
        "race_statue": 1// number比赛状态，0-表示新创建，1-表示已开始，2-已结束。只支持从低往高顺序修改，即状态为0时候可以改为1，1的时候可以改为2，不允许逆向修改
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```
### 新增联赛 [返回顶部](#race 后台接口文档)

接口地址: ``/api/backstage/league/created``

入参: 
```json
    {
        "league_name": "1",// string联赛名称
        "league_remark": "123"// string联赛备注
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```