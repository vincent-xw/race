### 新增代理

接口地址: ``/api/backstage/agent/created``

入参: 
```json
    {
        "agent_name": "1",
        "agent_password": "123456",
        "agent_phone": "13911112222",
        "agent_wechat": "abc123",
        "agent_remark": "123"
    }
```
参数说明

姓名，密码字段必传

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 修改代理

接口地址: ``/api/backstage/agent/update``

入参: 
```json
    {
        "agent_id": "1",
        "agent_name": "1",
        "agent_password": "123456",
        "agent_phone": "13911112222",
        "agent_wechat": "abc123",
        "agent_remark": "123"
    }
```
参数说明

需要修改的字段传，不需要修改的不传，不允许传空

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 获取代理列表

接口地址: ``/api/backstage/agent/list``

入参: 
无


响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "agent_list": [
                {
                    "agent_id": "1",
                    "agent_name": "1",
                    "agent_phone": "13911112222",
                    "agent_wechat": "abc123",
                    "agent_remark": "123"
                }
            ]
        }
    }
```
参数说明

|参数名称|说明|
----|----|
|agent_id|string,代理编号|
|agent_name|string,代理名称|
|agent_phone|string,代理手机|
|agent_wechat|string,代理微信|
|agent_remark|string,代理备注|


### 删除代理

接口地址: ``/api/backstage/agent/delete``

入参: 
```json
    {
        "agent_id": "1"
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```