### 比赛列表

接口地址: ``/api/front/race/list``

入参: 
无

响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "race_list": [
                {
                    "race_id": "1001",
                    "race_name": "1001",
                    "race_time": 1544544513119
                }
            ]
        }
    }
```
### 比赛详情

接口地址: ``/api/front/race/info``

入参: 
无

响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "race_info": {
                "league_id": "1",
                "league_name": "1",
                "race_name": "1",
                "race_time": 1544544513119,
                "horse_info": [
                    {
                        "horse_id": "1001",
                        "horse_name":"string",
                        "head_limit": 95,
                        "foot_limit": 95
                    }
                ]
            }
        }
    }
```
参数说明

|参数名称|说明|
|----|----|
|league_id|string，联赛ID，联赛接口返回的联赛列表中对应的联赛ID|
|race_time|timestamp，比赛时间|
|horse_info|数组，马匹信息，里面的每个item都有一个对象，创建只需要传名称及状态|
|horse_id|string，马匹id|
|horse_name|string，马匹名称|
|head_limit|string，头限额|
|foot_limit|string，脚限额|


