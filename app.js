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

        const passhash = existUser.password;
        // TODO: change to async compare
        const equal = ctx.helper.bcompare(password, passhash);
        // 密码不匹配
        if (!equal) {
            return null;
        }

        // 用户未激活
        if (!existUser.active) {
            // 发送激活邮件
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
    app.passport.verify(async (ctx, user) => user);
    app.passport.serializeUser(async (ctx, user) => user);
    app.passport.deserializeUser(async (ctx, user) => user);
};