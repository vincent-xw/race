## race 前台接口文档
| 接口名称 | 接口地址 | 备注 |
| ------ | ------ | ------ |
| 登录 | [``/api/front/login``](#登录) | 登录接口 |
| 修改密码 | [``/api/front/resetpwd``]() | 修改密码 |
| 联赛列表 | [``/api/front/league/list``]() | 获取联赛列表 |
| 比赛信息 | [``/api/front/race/info``]() | 获取比赛列表 |
| 投注 | [``/api/front/race/bet``]() | 比赛投注 |
| 投注详情 | [``/api/front/race/bet/detail``]() | 比赛投注详情 |
| 投注历史 | [``/api/front/race/bet/history``]() | 获取比赛投注历史 |

### 登录

接口地址: ``/api/front/login``

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