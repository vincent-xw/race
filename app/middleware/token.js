/*eslint-disabled*/
module.exports = () => async (ctx, next) => {
    let {app} = ctx;
    const user = ctx.cookies.get(app.config.auth_cookie_name, {
        signed: true,
        encrypt: true
    });
    let token = user.split('$$$$')[0];
    if (!token) {
        ctx.body = {
            status: 403,
            msg: '请重新登录'
        };
        ctx.status = 403;
        return;
    }
    ctx.request.user = token;
    await next();
};

