import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
    routerData
} from "../controller/statistics.js";
import {
    routerGeo
} from "../controller/geojson.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.path = "/api";
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.path, routerData);
        this.app.use(this.path, routerGeo);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port : ${this.port}`);
            }

        )
    }
}

export default Server;