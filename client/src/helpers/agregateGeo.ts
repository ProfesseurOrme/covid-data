import {departmentCoordinates} from "../utils/department-locations";
import {franceLocation} from "../utils/france-location";
import {regionsMetropoleCoordinates ,outreMerMetropoleCoordinates} from "../utils/region-locations";
import {States} from "../utils/IStates";
import {GeoData, StateData, GeoJSONObjects} from "./IAgregateGeo"
import { getDepartmentsCoordinates, getRegionsCoordinates } from '../apis/geojson';

const getDataGeo  = async()  => {

    const departmentsCoordinates = await getDepartmentsCoordinates;

    const regionsCoordinates = await getRegionsCoordinates;

    return {
        france: franceLocation,
        departments: setGeoDataPerState(departmentsCoordinates, departmentCoordinates),
        regions: setGeoDataPerState(regionsCoordinates, regionsMetropoleCoordinates.concat(outreMerMetropoleCoordinates))
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
                                name: geoJsonObject.properties.nom
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