const connection = require('../Config/db')

module.exports = {

    showAllMessage(req, res) { 
        connection.query("SELECT * FROM Message",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertMessage(req, res) {
        connection.query("INSERT INTO Message SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
