const connection = require('../Config/db')

module.exports = {

    showAllMember(req, res) { 
        connection.query("SELECT * FROM Member",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertMember(req, res) {
        connection.query("INSERT INTO Member SET ?", req.body , (error, results, fields) => {
            if (error) {
                res.send("Insert Fail");
            } 
            res.send("Insert Successfully");
        });
    }

};
