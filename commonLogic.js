dal = require('./dal');


function tryCloseDeal(uid, roomName, dealId) {
    return dal.tryCloseDeal(uid, roomName, dealId)
    .then((res) => {
        if (res.isSuccess) {
            return sendEmail(uid, roomName)
            .then(()=>{
                return Promise.resolve(res);
            })
        }
        return Promise.resolve(res);
    });
}

function addBonusPoints(uid, points){
    return dal.addPointsToUser(uid, points);
}

function releaseRoom(roomName){
    return dal.releaseRoom(roomName);
}

function sendEmail(uid, hotel){
    //sent
    return Promise.resolve();
}

module.exports = { tryCloseDeal, addBonusPoints, releaseRoom }