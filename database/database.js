const mysql = require('mysql');
var config = require('../config.json')

//TODO: Make this a class

var con = mysql.createConnection({
    host: config.server,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports.connect = () => {

    con.connect((err) => {
        if(err) throw err;
        console.log("Connected to the database");
    });

}

module.exports.GetUserData = (userid, cb) => {
    this.ContainsUser(userid, res => {
        if(res){
            con.query(`SELECT * FROM Users WHERE \`DiscordId\` = ${userid}`, (err, res, fields) => {
                if(err) throw err;
                if(cb) cb(res[0]);
            })
        }else{
            this.AddUser(userid);
        }
    })
}

module.exports.AddUser = (userId, cb) => {
    con.query(`INSERT INTO Users(DiscordID, Watermelon, Level, Exp, Hugs, LastHugger) VALUES (${userId}, 100, 1, 0, 0, 'none')`, (err, res, fields) => {
        if(err) throw err;
        if(cb) cb(res);
    });
}

module.exports.ContainsUser = (userId, cb) => {

    con.query(`SELECT * FROM Users WHERE DiscordID = ${userId}`, (err, res, fields) => {
        if(err) throw err;
        if(cb){
            if(res.length == 0) cb(false);
            else cb(true);  
        }
    })

}

module.exports.GetAllCards = (cb) => {
    con.query(`SELECT * FROM Cards`,(err,res,fields) => {
        if(err) throw err;
        if(cb) cb(res);
    });
}


module.exports.AddHug = (userId, lastHugger ,cb) => {
    con.query(`UPDATE Users SET \`Hugs\` = \`Hugs\`+1, \`LastHugger\` = '${lastHugger}'  WHERE DiscordID = ${userId} `, (err,res,felds) => {
        if(err) throw err;
        if(cb) cb(res);
    })
}

module.exports.GenerateCard = (userId, cardName, cardAlbum, grade ,cb) => {
    //Make "CardName" contain the name of the idol and the album like this: "Wooyoung All To One"
    con.query(`INSERT INTO usercards(OwnerId, CardName, Grade) 
            VALUES('${userId}' , '${cardName}' , '${cardAlbum}' , '${grade}')`, (err, res, fields) => {
                if(err) throw err;
                if(cb) cb(res);
            });
}

module.exports.AddCard = (cardName, cardPrice, album, cardImage, cb) => {
    con.query(`INSERT INTO Cards(CardName, CardPrice,  Album, CardImage)
        VALUES('${cardName}', '${Number(cardPrice)}', '${album}', '${cardImage}')`,(err, res, fields) =>{
            if(err)throw err;
            if(cb) cb(res);
        })
}

module.exports.GetCardFromName = (cardName, cb) => {
    con.query(`SELECT * FROM Cards WHERE CardName = '${cardName}'`, (err, res, fields) => {
        if(err) throw err;
        if(cb) cb(res);
    })
}