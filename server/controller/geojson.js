import express from "express";
import {
    getDepartmentsGeojson,
    getRegionsGeojson
} from "../api/geojsonApi.js";

const routerGeo = express.Router();

const settings = {method : "GET"};

const apiRessources = [
    getDepartmentsGeojson,
    getRegionsGeojson
];

routerGeo.get("/geojson", (req, res, next) => {

    Promise.all(apiRessources)
        .then(values => {
            const data = {
                departments : values[0],
                regions : values[1]
            }

            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).json({
                message : error
            })
        })
});

export {
    routerGeo
};