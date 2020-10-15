const fs = require('fs');

module.exports = {
    APP: {
        PORT: 3000,
        NAME: 'Note Taking Application'
    },

    DB: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "",
        NAME: "nodejs_note_app"
    },

    ROOT_PATH: fs.realpathSync('./') + '/note-service/src/',

    path: function (path = '') {
        return this.ROOT_PATH + path;
    },

    appPath: function (path = '') {
        return this.path('app/' + path);
    }
};