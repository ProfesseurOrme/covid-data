import fetch from "node-fetch";
import {
    FR_GEOJSON_DEPARTMENTS,
    FR_GEOJSON_REGIONS
} from "../utils/urls.js";

const settings = {method : "GET"};

const getDepartmentsGeojson = fetch(FR_GEOJSON_DEPARTMENTS, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

const getRegionsGeojson = fetch(FR_GEOJSON_REGIONS, settings)
        .then((result) => result.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            return {message : error}
        })
    ;

export {
    getDepartmentsGeojson,
    getRegionsGeojson
}