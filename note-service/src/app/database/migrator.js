const fs = require('fs');
const dbConn = require('./connector');
const config = require('../config/config');

const plainSql = fs.readFileSync(config.appPath('database/migrations.sql')).toString();

dbConn.query(plainSql, function (error, result) {
    if(error){
        console.log(error);
    }else {
        console.log('Database table migrated successfully.');
        console.log(result);
    }
});