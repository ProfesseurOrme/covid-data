import { GeoJSON } from 'react-leaflet'
import axios from "axios";

type FrData = {
    name : string,
    code : string,
    incidence_rate : {
        last_value : string,
        evolution : string,
        evolution_color : string,
        date : string
    },
    geojson : GeoJSON.Feature
}

type GlobalData = {
    departments : FrData[],
    regions : FrData[]
}


type DataIncidenceRate = {
    nom: string,
    unite : string,
    unite_short : string,
    trenType: string,
    france : Array<object>,
    regions : Array<any>
    departements : Array<any>
}

type GeoJSONObjects = {
    type : string,
    features : Array<any>
}

const getData = async() => {

    const getDataPerStateAndDepartment = await axios.get<DataIncidenceRate>("http://localhost:3001/api/data/statistics/incidence-rate")
        .then((res) => {
            return res.data;
        })
    ;

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

    return {
        departments : agregate(getDataPerStateAndDepartment.departements, getDepartmentsCoordinates),
        regions : agregate(getDataPerStateAndDepartment.regions, getRegionsCoordinates)
    }
}

const agregate = (incidenceRateData : any[], dataState : GeoJSONObjects) => {

    let data : FrData[] = []

    incidenceRateData.forEach((dptItem) => {
        dataState.features.forEach((geoItem) => {
            if (dptItem.code_level === geoItem.properties.code) {
                data.push({
                    name: geoItem.properties.nom,
                    code: geoItem.properties.code,
                    incidence_rate: {
                        last_value: dptItem.last_value,
                        evolution: dptItem.evol,
                        evolution_color: dptItem.evol_color,
                        date: dptItem.last_date
                    },
                    geojson : {
                        type : "Feature",
                        properties: {
                            name: geoItem.properties.nom
                        },
                        geometry: {
                            type: geoItem.geometry.type,
                            coordinates: geoItem.geometry.coordinates
                        }
                    }
                })
            }
        });
    });
    return data;
}

export {getData};

export type {GlobalData, FrData};