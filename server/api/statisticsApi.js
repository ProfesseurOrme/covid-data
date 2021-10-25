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

const settings = {method : "GET"};

const getIncidenceRate = fetch(FR_INCIDENCE_RATE, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getPositivesCases = fetch(FR_POSITIVES_CASES, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getHospitalizations = fetch(FR_HOSPITALIZATIONS, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getIntensiveCare = fetch(FR_INTENSIVE_CARE, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getTotalDeaths = fetch(FR_TOTAL_DEATH, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getTotalVaccinated = fetch(FR_TOTAL_VACCINATED, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getFirstShotVaccine = fetch(FR_FIRST_SHOT_VACCINE, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getTotalHomeReturns = fetch(FR_TOTAL_HOME_RETURNS, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

export {
    getIncidenceRate,
    getPositivesCases,
    getHospitalizations,
    getIntensiveCare,
    getTotalDeaths,
    getTotalVaccinated,
    getFirstShotVaccine,
    getTotalHomeReturns
}