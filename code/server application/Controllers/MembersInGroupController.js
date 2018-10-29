const connection = require('../Config/db')

module.exports = {

    showAllGroupMembers(req, res) { 
        connection.query("SELECT * FROM MembersInGroup",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertGroupMembers(req, res) {
        connection.query("INSERT INTO MembersInGroup SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
