const connection = require('../Config/db')

module.exports = {

    showAllContent(req, res) { 
        connection.query("SELECT * FROM Content",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertContent(req, res) {
        connection.query("INSERT INTO Content SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
