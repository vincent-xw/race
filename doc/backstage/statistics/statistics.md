### 数据统计

接口地址: ``/api/backstage/statistics/list``

入参: 
```json
    {
        "start_time": 1544544513119,
        "end_time": 1544544513119,
        "statistics_type": "year"
    }
```
参数说明
|参数名称|required|说明|
|----|----|----|
|start_time|y|timestamp，开始时间，不允许只传其中一个|
|end_time|y|timestamp，截止时间，不允许只传其中一个|
|statistics_type|y|string，统计粒度，支持year,month,day表示年月日|
响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data":{
            "statistics_list":[
                {
                    "stat_time": 1544544513119,
                    "all_bet": "10000",
                    "all_win": "8000",
                    "player_win": "2000"
                }
            ]
        }
    }
```