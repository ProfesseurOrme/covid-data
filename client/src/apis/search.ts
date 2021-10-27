import axios from "axios";

export type ISearch = {
    type: string,
    version: string,
    features: Array<ISearchFeatures>,
    attribution: string,
    licence: string,
    query: string,
    filters: {
        type: string
    },
    limit : number
}


export type ISearchFeatures = {
    type: string,
    geometry: {
        type: string,
        coordinates: [
            number,
            number
        ]
    },
    properties: {
        label: string,
        score: number,
        id: string,
        type: string,
        name: string,
        postcode: string,
        citycode: string,
        x: number,
        y: number,
        population: number,
        city: string,
        context: string,
        importance: number
    }
}

export const search = (search : string) => {
    return axios.get<ISearch>(`https://api-adresse.data.gouv.fr/search/?q=${search}&limit=10&type=municipality&autocomplete=0`)
        .then((res) => {
            return res.data
        })
    ;
}