import axios from "axios";
import { GeoJSONObjects } from "../helpers/IAgregateGeo";

const getDepartmentsCoordinates = axios.get<GeoJSONObjects>("http://localhost:3001/api/data/departments")
    .then((res) => {
        return res.data;
    })
;

const getRegionsCoordinates = axios.get<GeoJSONObjects>("http://localhost:3001/api/data/regions")
    .then((res) => {
        return res.data;
    })
;

export {getDepartmentsCoordinates, getRegionsCoordinates};