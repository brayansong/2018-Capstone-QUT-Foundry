require("dotenv").config();

const SERVER_URL = process.env.NODE_ENV === "production" ?
    "https://www.jeffreylaudev.tk:3000" :
    "https://localhost:3000"

export default SERVER_URL;



