const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
    // session 存储
    app.sessionStore = {
        // support promise / async
        async get(key) {
          // return value;
        },
        async set(key, value, maxAge) {
          // set key to store
        },
        async destroy(key) {
          // destroy key
        }
    };
};
