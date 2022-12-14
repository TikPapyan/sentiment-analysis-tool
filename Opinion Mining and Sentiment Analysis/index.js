import express from "express"
const app = express();
import globalMiddleware from './startup/globalMiddleware.js';
import routes from './startup/routes.js';
import db from './startup/db.js'

globalMiddleware(app);
routes(app);

app.listen(3000,()=>{
    console.log("server run 3000")
})