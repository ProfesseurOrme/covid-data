type State  = {
    name : string,
    code: string,
    coordinates : CoordinatesFormat
    properties ? : {
        zoom: number,
        minZoom : number
    },
    geojson ? : {
        type : string,
        properties: {
            name: string
        },
        geometry: {
            type: string,
            coordinates: any[]
        }
    }
};

type CoordinatesFormat = {
    latitude: number,
    longitude: number
}

type States = Array<State>;

export type {States, State};