const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
    const localHandler = async (ctx, {
        username,
        password
    }) => {
        const getUser = username => ctx.service.user.getUserByLoginName(username);
        const existUser = await getUser(username);

        // 用户不存在
        if (!existUser) {
            return null;
        }
        const equal = password === existUser.user.password;
        // 密码不匹配
        if (!equal) {
            return null;
        }

        // 验证通过
        return existUser;
    };
    // 挂载 strategy
    app.passport.use(new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        // format user
        const user = {
            provider: 'local',
            username,
            password
        };
        app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        ctx.logger.debug('passport.verify', user);
        const handler = localHandler;
        const existUser = await handler(ctx, user);
        if (existUser) {
            // id存入Cookie, 用于验证过期.
            const authToken = existUser.user.id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
            const opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24,
                signed: true,
                httpOnly: true
            };
            ctx.cookies.set(app.config.auth_cookie_name, authToken, opts); // cookie 有效期1天
        }
        return existUser;
    });
    app.passport.serializeUser(async (ctx, user) => {
        return user;
    });
    app.passport.deserializeUser(async (ctx, user) => {
        if (user) {
            const authToken = ctx.cookies.get(ctx.app.config.auth_cookie_name, {
                signed: true
            });

            if (!authToken) {
                return user;
            }

            if (!user) {
                return user;
            }
        }

        return user.user;
    });
};