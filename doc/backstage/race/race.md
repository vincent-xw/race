### 创建比赛

接口地址: ``/api/backstage/race/add`` done

入参: 
```json
    {
        "league_id": "1",
        "league_name": "马来西亚",
        "race_time": 1544544513119,
        "horse_info": [
            {
                "horse_name":"string",
                "horse_status":0,
                "head_limit": 95,
                "foot_limit": 95
            }
        ]
    }
```
参数说明

||参数名称|required|说明|
|----|----|----|----|
|league_id||y|string，联赛ID，联赛接口返回的联赛列表中对应的联赛ID|
|race_time||y|timestamp，比赛时间|
|horse_info||y|数组，马匹信息，里面的每个item都有一个对象，创建只需要传名称及状态|
||horse_name|y|string，马匹名称|
||horse_status|y|number，马匹状态：0-可参赛，1-不可参赛|
||head_limit|y|number，头限额|
||foot_limit|y|number，脚限额|

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 删除比赛

接口地址: ``/api/backstage/race/delete`` done

入参: 
```json
    {
        "race_id": "1"
    }
```

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```
### 获取比赛列表

接口地址: ``/api/backstage/race/list``

入参: 
```json
    {
        "start_time": 1544544513119,
        "end_time": 1544544513119,
        "league_id": "1",
        "page_no": "1"
    }
```
参数说明

||参数名称|required|说明|
|----|----|----|----|
|start_time||n|timestamp，开始时间，不允许只传其中一个，只传其中一个默认俩都没传|
|end_time||n|timestamp，截止时间，不允许只传其中一个，只传其中一个默认俩都没传|
|league_id||y|string，马匹信息，联赛id|
|page_no||n|string，分页信息，默认第1页|


响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "page_no": "1",
            "page_count": "10",
            "page_size": "10",
            "list_data": [
                {
                    "race_id": "1001",
                    "league_id": "1",
                    "race_time": 1544544513119,
                    "created_time": 1544544513119,
                    "all_bet": 1000,
                    "all_win": 800,
                    "player_win": 200,
                    "race_status": 0
                }
            ]
        }
    }
```
参数说明

|参数名称|说明|
|----|----|
|race_id|string,比赛编号|
|league_id|string,联赛编号|
|race_time|timpstamp,比赛时间|
|created_time|timpstamp,创建时间|
|all_bet|int,总投注|
|all_win|int,总盈利|
|player_win|int,玩家盈利|
|race_status|int,比赛状态, 0-新创建，1-已发布，2-已结束|

### 查询比赛详情

接口地址: ``/api/backstage/race/detail``

入参: 
```json
    {
        "race_id": 1
    }
```
参数说明

|参数名称|required|说明|
|----|----|----|----|
|race_id|y|int 比赛id|


响应: 
```json
    {
        "status": 0,
        "msg": "",
        "data": {
            "list_data": {
                "race_id": "1001",
                "league_id": "1",
                "race_time": 1544544513119,
                "created_time": 1544544513119,
                "all_bet": 1000,
                "all_win": 800,
                "player_win": 200,
                "race_status": 0,
                "horse_info":[
                    {
                        "horse_name":"string",
                        "horse_status":0,
                        "head_limit": 95,
                        "foot_limit": 95
                    }
                ],
                "bet_info": [
                    {
                        "bet_id": 1,
                        "agent_id": 1,
                        "agent_name": "agent001",
                        "horse_id": "1001",
                        "horse_name": "马匹001",
                        "horse_score": "1",
                        "bet_time": 1544544513119,
                        "bet_head": 10,
                        "bet_foot": 20,
                        "head_odds": 10,
                        "foot_odds": 8,
                        "all_count": 100,
                        "win_count": 80
                    }
                ]
            }
        }
    }
```
参数说明

|参数名称||说明|
|----|----|----|
|race_id||string,比赛编号|
|league_id||string,联赛编号|
|race_time||timpstamp,比赛时间|
|created_time||timpstamp,创建时间|
|all_bet||int,总投注额|
|all_win||int,总赢钱|
|player_win||int,玩家赢钱|
|horse_info||array,马匹信息|
|bet_info||array,投注信息|

|race_status|int,比赛状态, 0-新创建，1-已发布，2-已结束|


### 修改比赛信息
修改比赛信息不同于修改比赛状态，修改信息仅仅支持在状态为0即未发布的情况下修改

接口地址: ``/api/backstage/race/update`` done

入参: 
```json
    {
        "race_id": "1",
        "league_id": "1",
        "race_time": 1544544513119,
        "horse_info": [
            {
                "horse_name":"string",
                "horse_status":0,
                "head_limit": 95,
                "foot_limit": 95
            }
        ]
    }
```
参数说明

|参数名称|required|说明|
|----|----|----|
|race_id|y|string比赛ID，依据已创建的比赛进行修改更新其余字段参考创建比赛|

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 修改比赛中单个马匹信息
修改比赛单个马匹的信息，修改马匹信息仅仅支持在状态为0即未发布的情况下修改

接口地址: ``/api/backstage/race/horse/update`` done

入参: 
```json
    {
        "race_id": "1",
        "horse_id": "1",        
        "horse_name":"string",
        "horse_status":0,
        "head_limit": 95,
        "foot_limit": 95
    }
```
参数说明

|参数名称|required|说明|
|----|----|----|
|race_id|y|string比赛ID，依据已创建的比赛进行修改更新其余字段参考创建比赛|

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 修改比赛至开始比赛

接口地址: ``/api/backstage/race/start-race``

入参: 
```json
    {
        "race_id": "1"
    }
```
参数说明

|参数名称|required|说明|
|----|----|----|
|race_id|y|string比赛ID|

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```

### 修改比赛状态至比赛结束

接口地址: ``/api/backstage/race/end-race``

入参: 
```json
    {
        "race_id": "1",
        "head_odds": "10",
        "foot_odds": "8"
    }
```
参数说明

|参数名称|required|说明|
|----|----|----|
|race_id|y|string 比赛ID，每条比赛的状态进行更新|
|head_odds|y|string头赔率|
|foot_odds|y|string脚赔率|

响应: 
```json
    {
        "status": 0,
        "msg": ""
    }
```