## race 前台接口文档
| 接口名称 | 接口地址 | 备注 |
| ------ | ------ | ------ |
| 登录 | [``/api/front/login``](#登录) | 登录接口，无需鉴权 |
| 修改密码 | [``/api/front/resetpwd``](#修改密码) | 修改密码，只允许修改当前登录账号的密码 |
| 联赛列表 | [``/api/front/league/list``](#联赛列表) | 获取联赛列表 |
| 比赛信息 | [``/api/front/race/info``](#比赛信息) | 获取比赛列表 |
| 投注 | [``/api/front/race/bet``](#投注) | 比赛投注 |
| 投注详情 | [``/api/front/race/bet/detail``](#投注详情) | 比赛投注详情 |
| 投注历史 | [``/api/front/race/bet/history``](#投注历史) | 获取比赛投注历史 |

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
ps 请求异常的http状态码将也是非200，前端可以据此做一统一拦截

### 修改密码

接口地址: ``/api/front/resetpwd``

入参: 
``oldPassword:string, newPassword:string``

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```
可能的异常: 当修改的非当前登录用户或者其他等非正常修改情况，status非0切包含错误话术msg