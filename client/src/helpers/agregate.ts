import { GeoJSON } from 'react-leaflet'
import axios from "axios";
import {departmentCoordinates} from "../utils/department-locations";
import {regionsMetropoleCoordinates ,outreMerMetropoleCoordinates} from "../utils/region-locations";
import {States, State} from "../utils/IStates";

type data = {
    last_value : string,
    evol : string,
    evol_color : string,
    evol_percentage : string,
    date : string
}

interface FrData  {
    name : string,
    code : string,

    incidence_rate : data,
    positives_cases : data
    geojson ? : GeoJSON.Feature
}


interface GlobalData {
    france ? : {},
    departments : any[],
    regions : any[]
}

type GeoJSONObjects = {
    type : string,
    features : Array<any>
}

const fields = (functionName : string) : string => {
    let field = "";
    switch (functionName) {
        case "getIncidenceRate":
            field = "incidence_rate";
            break;
        case "getPositivesCases":
            field = "positives_cases";
            break;
    }

    return field;
}

const getData  = async()  => {

    const getDepartmentsCoordinates = await axios.get<GeoJSONObjects>("http://localhost:3001/api/data/departments")
        .then((res) => {
            return res.data;
        })
    ;

    const getRegionsCoordinates = await axios.get<GeoJSONObjects>("http://localhost:3001/api/data/regions")
        .then((res) => {
            return res.data;
        })
    ;

    let states = {
        france : [{
            name : "France",
            code : "fra",
            coordinates: {
                latitude : 46.2276,
                longitude : 2.213749
            }
        }],
        departments : setGeoDataPerState(getDepartmentsCoordinates, departmentCoordinates),
        regions : setGeoDataPerState(getRegionsCoordinates, regionsMetropoleCoordinates.concat(outreMerMetropoleCoordinates))
    }

    console.log(states);



    const getIncidenceRate = await axios.get("http://localhost:3001/api/data/statistics/incidence-rate")
        .then((res) => {
            let newObj = {};
            for(let property in states) {

                newObj = {
                    ...states,
                    [property] : agregate(res.data[property], [], "incidence_rate")
                }
            }

            console.log(newObj);

            return res.data
        })
    ;



    const getPositivesCases = await axios.get("http://localhost:3001/api/data/statistics/positives-cases")
        .then((res) => {
            return res.data
        })
    ;

    const results = [getPositivesCases, getIncidenceRate];

    return {};
}

const agregate = (data : any[], states : any[], ressource : string) => {
    console.log(data)
    let newData : [] = [];
    data.forEach((item) => {
        states.forEach((state: any) => {
            const newObj = {
                ...state,
                [ressource] : {
                    ...item
                }
            }

            // @ts-ignore
            newData.push(newObj);
        })
    })
}

const setGeoDataPerState = (geoJsonObjects : GeoJSONObjects, states : States) => {

    let newData : any[] = [];

    states.forEach((state) => {
        geoJsonObjects.features.forEach((geoJsonObject) => {
            if(geoJsonObject.properties.code === state.code) {
                const newObj = {
                    ...state,
                    geojson : {
                        type : "Feature",
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

    return newData;
}

export {getData};

export type {GlobalData, FrData};