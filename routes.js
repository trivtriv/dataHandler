commonLogic = require('./commonLogic');

module.exports = function(app){
    app.get('/closeDeal', function(req, res){
        const {roomName, uid, dealId} = req.query;
        commonLogic.tryCloseDeal(uid, roomName, dealId)
        .then((dealRes)=>{
            res.status(200).send(dealRes);
        })
        .catch((err)=>{
            res.status(500);
        })
    });

    app.get('/addBonusPoints', function(req, res){
        const {points, uid} = req.query;
        commonLogic.addBonusPoints(uid, points)
        .then(()=> {
            res.status(200).send();
        })
        .catch((err)=>{
            res.status(500);
        })
    });

    app.get('/releaseRoom', function(req, res){
        const {roomName} = req.query;
        commonLogic.releaseRoom(roomName)
        .then(()=> {
            res.status(200).send();
        })
        .catch((err)=>{
            res.status(500);
        })
    });

}