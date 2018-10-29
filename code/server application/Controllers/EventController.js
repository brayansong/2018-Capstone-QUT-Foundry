const connection = require('../Config/db')

module.exports = {

    showAllEvent(req, res) {
        const q = "SELECT * FROM EVENT";
        connection.query(q, function(error, results, fields){
            if (error) throw error;
            // console.log(results.length);
            res.send(results);
        });
    },

    insertEvent(req, res) {
        const event = req.body;

        connection.query("INSERT INTO Event SET ?", event ,  function(error, results, fields){
            if (error) throw error;
            // console.log(results.length);
            res.send(results);
        });
    }

};
