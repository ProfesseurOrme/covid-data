import {
    departmentCoordinates
} from "../utils/department-locations";
import {
    franceLocation
} from "../utils/france-location";
import {
    regionsMetropoleCoordinates,
    outreMerMetropoleCoordinates
} from "../utils/region-locations";
import {
    States
} from "../utils/IStates";
import {
    GeoJSONObjects
} from "./IAgregateGeo"
import {
    getGeojson
} from '../apis/geojson';

const getDataGeo  = async()  => {

    const coordinates = await getGeojson;

    return {
        france: franceLocation,
        departments: setGeoDataPerState(coordinates.departments, departmentCoordinates),
        regions: setGeoDataPerState(coordinates.regions, regionsMetropoleCoordinates.concat(outreMerMetropoleCoordinates))
    }

}

const setGeoDataPerState = (geoJsonObjects : GeoJSONObjects, states : States) => {

    let newData: any[] = [];

    if (typeof geoJsonObjects !== "undefined") {
        states.forEach((state) => {
            geoJsonObjects.features.forEach((geoJsonObject) => {
                if (geoJsonObject.properties.code === state.code) {
                    const newObj = {
                        ...state,
                        geojson: {
                            type: "Feature",
                            properties: {
                                name: geoJsonObject.properties.nom,
                                coordinates: [state.coordinates.latitude, state.coordinates.longitude]
                            },
                            geometry: {
                                type: geoJsonObject.geometry.type,
                                coordinates: geoJsonObject.geometry.coordinates
                            }
                        }
                    }

                    newData.push(newObj);
                }
            })
        })
    }

    return newData;
}

export {getDataGeo};