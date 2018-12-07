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
        "data":{}
    }
```
当接口异常一般有两种通用结果，即http status code为4XX或者5XX时候，需要单独处理，前端需做好兼容处理
### 前台接口
[前台](./front/front.md)
### 后台接口
[后台](./backstage/backstage.md)
