const connection = require('../Config/db')

module.exports = {

    showAllHotPops(req, res) { 
        connection.query("SELECT * FROM Hot Pop",(error, results, fields) =>{
            if (error) throw error;
            res.send(results);
        });
    },

    insertHotPops(req, res) {
        connection.query("INSERT INTO Hot pop SET ?", req.body , (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });
    }

};
