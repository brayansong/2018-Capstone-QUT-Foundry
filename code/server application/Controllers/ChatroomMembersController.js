const connection = require('../Config/db')

module.exports = {

    showAllChatroomMembers(req, res) { 
        connection.query("SELECT * FROM Chatroom Members",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertChatroomMembers(req, res) {
        connection.query("INSERT INTO Chatroom Members SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
