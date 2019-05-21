require("dotenv").config();

const SERVER_URL = process.env.NODE_ENV === "production" ?
    "https://www.jeffreylaudev.tk:8443" :
    "https://localhost:8443"

export default SERVER_URL;



