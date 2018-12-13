### 新增联赛

接口地址: ``/api/backstage/league/created`` done

入参: 
```json
    {
        "league_name": "1",
        "league_remark": "123"
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 修改联赛

接口地址: ``/api/backstage/league/update`` done

入参: 
```json
    {
        "league_id": "1",
        "league_name": "1",
        "league_remark": "123"
    }
```
参数说明

league_id 毕传，其他需要修改的传值，不需要的不传或者保持原样上传
响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 获取联赛列表

接口地址: ``/api/backstage/league/list``

入参: 
无


响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "league_list": [
                {
                    "league_id": "1001",
                    "league_name": "1001",
                    "created_time": 1544544513119,
                    "uodated_time": 1544544513119,
                    "league_status": 0,
                    "league_remark": "1001",
                }
            ]
        }
    }
```
参数说明

|参数名称|说明|
----|----|
|league_id|string,联赛编号|
|league_name|string,联赛名称|
|created_time|timpstamp,创建时间|
|uodated_time|timpstamp,更新时间|
|league_status|int,联赛状态, 0-正常，1-关闭|
|league_remark|string,联赛备注|


### 删除联赛

接口地址: ``/api/backstage/league/delete``

入参: 
```json
    {
        "league_id": "1"
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```