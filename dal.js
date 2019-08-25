const mysql = require('mysql2/promise');
const config = require('./config');

let dbCconnection = mysql.createPool({
    host     : config.db.host,
    user    : config.db.user,
    password : config.db.password,
    database : config.db.database,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10,
    queueLimit: 0
});

function releaseRoom(roomName){
    let query =  `UPDATE hotels.hotel_rooms SET available_amount = available_amount + 1 
    WHERE room_name = '${roomName}';`;
    // here we should add also writing to monitor

    return dbCconnection.query(query);
}

function addPointsToUser(uid, points){
    let query = `UPDATE hotels.users SET available_score = available_score + ${points} WHERE Id = ${uid};`
    // here we should add also writing to monitor

    return dbCconnection.query(query);
}

function tryCloseDeal(uid, roomName, dealId){
    return new Promise((resolve, reject)=>{   
      dbCconnection.query(`SET @dealId = ${dealId ? dealId :null};
            CALL close_room(${uid}, '${roomName}', @dealId, @outp);`).then(function (res) {
        return dbCconnection.query(`select @outp, @dealId;`).then((res) => {
          resolve({isSuccess:res[0][0]['@outp'],dealId: res[0][0]['@dealId']});
        });
      });
    })
}

module.exports = { addPointsToUser, tryCloseDeal, releaseRoom }