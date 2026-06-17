import "dotenv/config";
import app from "./src/app.js"
import { connectdb } from "./src/config/db.js"


const port = process.env.PORT


app.listen(port, () => {
    connectdb()

    
    console.log(`Example app listening on port ${port}!`)
})