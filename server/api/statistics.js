import express from "express";
import fetch from "node-fetch";
import {
    FR_INCIDENCE_RATE,
    FR_GEOJSON_DEPARTMENTS,
    FR_GEOJSON_REGIONS,
    FR_POSITIVES_CASES,
    FR_HOSPITALIZATIONS,
    FR_INTENSIVE_CARE,
    FR_TOTAL_DEATH,
    FR_TOTAL_VACCINATED,
    FR_FIRST_SHOT_VACCINE,
    FR_TOTAL_HOME_RETURNS
} from "../utils/urls.js";

const routerData = express.Router();

const settings = {method : "GET"}

routerData.get("/data/statistics/positives-cases", (req, res, next) => {

    fetch(FR_POSITIVES_CASES, settings)
        .then((result) => result.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((error) => {
            res.status(400).json({
                message: error
            });
        })
    ;
});

routerData.get("/data/statistics/hospitalizations", (req, res, next) => {
    fetch(FR_HOSPITALIZATIONS, settings)
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

routerData.get("/data/statistics/intensive_care" , (req, res, next) => {
    fetch(FR_INTENSIVE_CARE, settings)
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

routerData.get("/data/statistics/incidence-rate", (req, res, next) => {

    fetch(FR_INCIDENCE_RATE, settings)
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

routerData.get("/data/statistics/total_death", (req, res, next) => {

   fetch(FR_TOTAL_DEATH, settings)
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

routerData.get("/data/statistics/total_vaccinated", (req, res, next) => {

    fetch(FR_TOTAL_VACCINATED, settings)
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

routerData.get("/data/statistics/first_shot_vaccine", (req, res, next) => {

    fetch(FR_FIRST_SHOT_VACCINE, settings)
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

routerData.get("/data/statistics/total_home_returns", (req, res, next) => {

   fetch(FR_TOTAL_HOME_RETURNS, settings)
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

routerData.get('/favicon.ico', (req, res) => res.status(204));

export {
    routerData
}