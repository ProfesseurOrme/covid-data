import express from "express";
import fetch from "node-fetch";
import {
    getIncidenceRate,
    getPositivesCases,
    getHospitalizations,
    getIntensiveCare,
    getTotalDeaths,
    getTotalVaccinated,
    getFirstShotVaccine,
    getTotalHomeReturns
} from "../api/statisticsApi.js";

const routerData = express.Router();

const settings = {method : "GET"};

const apiRessources = [
    getIncidenceRate,
    getPositivesCases,
    getHospitalizations,
    getIntensiveCare,
    getTotalDeaths,
    getTotalVaccinated,
    getFirstShotVaccine,
    getTotalHomeReturns
];

routerData.get("/statistics", (req, res, next) => {
    Promise.all(apiRessources)
        .then(values => {

            const data = {
                incidence_rate : values[0],
                positives_cases : values[1],
                hospitalizations : values[2],
                intensive_care : values[3],
                total_death : values[4],
                total_vaccinated : values[5],
                first_shot_vaccine : values[6],
                total_home_returns : values[7]
            }

            res.status(200).json(data)
        })
        .catch(error => {
            res.status(400).json({
                messagee : error
            })
        })
});


routerData.get('/favicon.ico', (req, res) => res.status(204));

export {
    routerData
}