const connection = require('../Config/db')

module.exports = {

    showAllGroup(req, res) { 
        connection.query("SELECT * FROM Group",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertGroup(req, res) {
        connection.query("INSERT INTO Group SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
