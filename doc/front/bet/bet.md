### 投注

接口地址: ``/api/front/race/bet``

入参: 
```json
    {
        "race_id": "1",
        "horse_info": [
            {
                "horse_id": "1001",
                "bet_head": 10,
                "bet_foot": 20
            }
        ]
    }
```
参数说明

||参数名称|说明|
|----|----|----|
|league_id||string，联赛ID，联赛接口返回的联赛列表中对应的联赛ID|
|race_time||timestamp，比赛时间|
|horse_info||数组，马匹信息，里面的每个item都有一个对象，创建只需要传名称及状态|
||horse_id|string，马匹id|
||horse_name|string，马匹名称|
||head_limit|int，头限额|
||bet_head|int，头投注额|
||foot_limit|int，脚限额|
||bet_foot|int，脚投注额|

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 投注详情

接口地址: ``/api/front/race/bet/detail``

入参: 
```json
    {
        "bet_id": "1",
    }
```


响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "bet_detail": [
                {
                    "league_id": "1",
                    "race_time": 1544544513119,
                    "horse_info": [
                        {
                            "horse_id": "1001",
                            "horse_name":"string",
                            "bet_head": 10,
                            "head_limit": 95,
                            "bet_foot": 20,
                            "foot_limit": 95
                        }
                    ]
                }
            ]
        }
    }
```
参数说明
参照投注参数


### 投注历史

接口地址: ``/api/front/race/bet/detail``

入参: 
```json
    {
        "start_time": 1544544513119,
        "end_time": 1544544513119
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "bet_list": [
                {
                    "bet_id": "1001",
                    "bet_time":1544544513119,
                    "lottery_time": 1544544513119
                }
            ]
        }
    }
```
参数说明
|参数名称|说明|
|----|----|
|bet_id|string,投注编号|
|bet_time|timpstamp,投注时间|
|lottery_time|timpstamp,开奖时间|