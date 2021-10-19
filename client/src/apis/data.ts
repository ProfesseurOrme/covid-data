import axios from "axios";
import {data, states, value} from "../helpers/IData"

const getIncidenceRate = axios.get<data>("http://localhost:3001/api/data/statistics/incidence-rate")
        .then((res) => {
            return res.data
        })
    ;


const getPositivesCases = axios.get<data>("http://localhost:3001/api/data/statistics/positives-cases")
    .then((res) => {
        return res.data
    })
;


export {getIncidenceRate, getPositivesCases};