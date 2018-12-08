module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        await next();
        if (ctx.status === 404 && !ctx.body) {
            if (ctx.acceptJSON) {
                ctx.body = {
                    status: 500,
                    error: 'not found'
                };
            } else {
                ctx.body = '<h1>Page Not Found</h1>';
            }
        }
    };
};