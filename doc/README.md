## race系统接口文档
接口均采用restfulAPI设计,通过路径鉴权访问
### 整体设计
接口均已``/api/{syspath}/{module}``的形式发布，例如``/api/front/login``
当接口http请求返回200的情况下,结构示例
```js
    {
        // int型，这个字段总会有，表示当前接口返回状态
        "status":0,
        // string型，这个字段不一定会有，或者以空字符串形式返回
        "msg":"",
        // JSONString型，这个字段不一定会有，但凡涉及到需要后端返回数据的时候此字段才会返回，其余时候可能为空可能不存在
        "data":{
            // data字段内有可能会出现分页信息，分页信息主要由以下组成，page_no表示当前页码，即前端传给后端的后端透传回去
            // page_count表示一共多少页
            // page_size表示每页多少条，默认值10，暂时不支持修改
            "page_no": "1",
            "page_count": "10",
            "page_size": "10"
        }
    }
```
当接口异常一般有两种通用结果，即http status code为4XX或者5XX时候，需要单独处理，前端需做好兼容处理

ps1 接口涉及到时间的部分全部传时间戳即timestamp，需要前端格式化
ps2 接口涉及到金钱的部分，目前没涉及到，全部传分，需要前端格式化
ps3 新增接口类型即http type，原则上需要传递参数给后端并且会进行更新数据的接口，采用post。只是查询的接口采用get

### 前台接口
[前台](./front/front.md)
### 后台接口
[后台](./backstage/backstage.md)
