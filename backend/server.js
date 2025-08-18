import app from './app.js';
import connectDB from "./src/db/db.js"


connectDB()


app.listen(3000, () => {
    console.log("server is running on port 3000")
})






