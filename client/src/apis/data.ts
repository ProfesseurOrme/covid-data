import axios from "axios";
import {data, states, value} from "../helpers/IData";

export const getGlobalStats = axios.get<any>("http://localhost:3001/api/data/statistics/global")
    .then((res) => {
        return res.data;
    })
;

export const getIncidenceRate = axios.get<data>("http://localhost:3001/api/data/statistics/incidence-rate")
    .then((res) => {
        return res.data;
    })
;

export const getPositivesCases = axios.get<data>("http://localhost:3001/api/data/statistics/positives-cases")
    .then((res) => {
        return res.data;
    })
;

export const getHospitalizations = axios.get<data>("http://localhost:3001/api/data/statistics/hospitalizations")
    .then((res) => {
        return res.data;
    })
;

export const getIntensiveCare = axios.get<data>("http://localhost:3001/api/data/statistics/intensive_care")
    .then((res) => {
        return res.data;
    })
;

export const getTotalDeath = axios.get<data>("http://localhost:3001/api/data/statistics/total_death")
    .then((res) => {
        return res.data;
    })
;

export const getTotalVaccinated = axios.get<data>("http://localhost:3001/api/data/statistics/total_vaccinated")
    .then((res) => {
        return res.data;
    })
;

export const getFirstShotVaccine = axios.get<data>("http://localhost:3001/api/data/statistics/first_shot_vaccine")
    .then((res) => {
        return res.data;
    })
;
