type GeoData = {
    france : StateData[],
    departments : StateData[],
    regions : StateData[]
}

type StateData =  {
    name : string,
    code : string,
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