### 投注

接口地址: ``/api/front/race/bet`` done

入参: 
```json
    {
        "race_id": "1",
        "agent_id": "1",
        "bet_info": [
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
|bet_info||数组，马匹信息，里面的每个item都有一个对象，创建只需要传名称及状态|
||horse_id|string，马匹id|
||bet_head|int，头投注额|
||bet_foot|int，脚投注额|

响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "bet_id": 123456
        }
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
            "bet_detail": {
                "bet_id": "1",
                "league_id": "1",
                "race_time": 1544544513119,
                "bet_time": 1544544513119,
                "horse_info": [
                    {
                        "horse_id": "1001",
                        "horse_name":"string",
                        "bet_head": 10,
                        "bet_foot": 20
                    }
                ]
            }
        }
    }
```
参数说明

参照投注参数


### 投注历史

接口地址: ``/api/front/race/bet/history``

入参: 
```json
    {
        "bet_start_time": 1544544513119,
        "bet_end_time": 1544544513119,
        "race_start_time": 1544544513119,
        "race_end_time": 1544544513119
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
                    "race_name": "马来西亚-2018年12月13日-比赛001",
                    "bet_time":1544544513119,
                    "race_time": 1544544513119
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