/*eslint-disabled*/
module.exports = () => async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
        if (ctx.acceptJSON) {
            ctx.body = {
                status: 404,
                msg: '您请求的资源不存在，请确认请求信息'
            };
        }
        else {
            ctx.body = '<h1>您请求的资源不存在，请确认请求信息</h1>';
        }
    }
};

