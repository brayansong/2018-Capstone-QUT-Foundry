const connection = require('../Config/db')

module.exports = {

    showAllEventGuest(req, res) { 
        connection.query("SELECT * FROM EventGuest",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertEventGuest(req, res) {
        connection.query("INSERT INTO EventGuest SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
