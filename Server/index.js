import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

const app = express();


const PORT = 8000 || process.env.PORT;


app.listen(PORT, ()=>console.log(`Listening at port ${PORT}`));