import axios from "axios";
import {
    GeoJSONObjects
} from "../helpers/IAgregateGeo";

export const getGeojson = axios.get<{departments : GeoJSONObjects, regions : GeoJSONObjects}>("http://localhost:3001/api/geojson")
    .then((res) => {
        return res.data;
    })
;