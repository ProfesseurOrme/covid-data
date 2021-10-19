import express from "express";
import fetch from "node-fetch";
import {
    FR_GEOJSON_DEPARTMENTS,
    FR_GEOJSON_REGIONS
} from "../utils/urls.js";

const routerGeo = express.Router();

const settings = {method : "GET"}

routerGeo.get("/data/departments", (req, res, next) => {

    fetch(FR_GEOJSON_DEPARTMENTS, settings)
        .then((result) => result.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((error) => {
            res.status(400).json({
                message : error
            });
        })
    ;
});

routerGeo.get("/data/regions", (req, res, next) => {

    fetch(FR_GEOJSON_REGIONS, settings)
        .then((result) => result.json())
        .then((json) => {
            res.status(200).json(json)
        })
        .catch((error) => {
            res.status(400).json({
                message : error
            });
        })
    ;
});

export {routerGeo};