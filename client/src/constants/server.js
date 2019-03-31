require("dotenv").config();

const SERVER_URL = process.env.NODE_ENV === "production" ?
    "http://www.jeffreylaudev.tk:3000" :
    "http://www.jeffreylaudev.tk:3000"

export default SERVER_URL;



