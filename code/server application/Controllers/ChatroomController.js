const connection = require('../Config/db')

module.exports = {

    showAllChatroom(req, res) { 
        connection.query("SELECT * FROM Chatroom",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertChatroom(req, res) {
        connection.query("INSERT INTO Chatroom SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
