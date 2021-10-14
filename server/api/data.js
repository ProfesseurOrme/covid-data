import express from "express";
import fetch from "node-fetch";
import {FR_GLOBAL_COVID_STATISTICS, FR_INCIDENCE_RATE} from "../utils/urls.js"

const router = express.Router();

const settings = {method : "GET"}

router.get("/data/global-statistics", (req, res, next) => {

    fetch(FR_GLOBAL_COVID_STATISTICS, settings)
        .then(result => result.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((error) => {
            res.status(400).json({
                message : error
            })
        })
});

router.get("/data/incidence-rate", (req, res, next) => {
    fetch(FR_INCIDENCE_RATE, settings)
        .then((result => result.json()))
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((error) => {
            res.status(400).json({
                message : error
            })
        })
})

router.get('/favicon.ico', (req, res) => res.status(204));

export {router}