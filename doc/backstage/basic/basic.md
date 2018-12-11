### 登录

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

### 注销

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