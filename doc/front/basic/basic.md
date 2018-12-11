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