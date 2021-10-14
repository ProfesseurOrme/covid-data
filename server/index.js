import express from "express";
import bodyParser from "body-parser";
import {router} from "./api/data.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})