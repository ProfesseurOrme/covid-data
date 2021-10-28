type GeoData = {
    france : StateData[],
    departments : StateData[],
    regions : StateData[]
}

type StateData =  {
    name : string,
    code : string,
    coordinates : {
        latitude : number,
        longitude : number
    }
    geojson : GeoJSON.Feature
}

type GeoJSONObjects = {
    type : string,
    features : Array<any>
}

export type {
    GeoData,
    StateData,
    GeoJSONObjects
};