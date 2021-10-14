type regionLocations = Array<region>;

type region = {
    name : string,
    code: string,
    coordinates : coordinatesFormat
};

type coordinatesFormat = {
    latitude: number,
    longitude: number
}

const regionsCoordinates : regionLocations = [
    {
        name : "Grand Est",
        code : "44",
        coordinates : {
            latitude: 48.68,
            longitude: 5.61
        }
    },
    {
        name : "Nouvelle Aquitaine",
        code : "75",
        coordinates : {
            latitude: 45.2,
            longitude: 0.19
        }
    },
    {
        name : "Auvergne Rhône-Alpes",
        code : "84",
        coordinates : {
            latitude : 45.52,
            longitude : 4.54
        }
    },
    {
        name : "Bourgogne Franche-Comté",
        code : "27",
        coordinates : {
            latitude: 47.24,
            longitude: 4.81
        }
    },
    {
        name : "Bretagne",
        code : "53",
        coordinates : {
            latitude : 	48.19,
            longitude : -2.85
        }
    },
    {
        name : "Centre-Val de Loire",
        code : "24",
        coordinates :  {
            latitude : 47.5,
            longitude : 1.68
        }
    },
    {
        name : "Corse",
        code : "94",
        coordinates : {
            latitude : 42.17,
            longitude : 9.17
        }
    },
    {
        name : "Île de France",
        code : "11",
        coordinates : {
            latitude : 48.69,
            longitude : 2.50
        }
    },
    {
        name : "Occitanie",
        code : "76",
        coordinates : {
            latitude : 43.70,
            longitude : 2.13
        }
    },
    {
        name : "Hauts-de-France",
        code: "32",
        coordinates : {
            latitude : 49.98,
            longitude : 2.78
        }
    },
    {
        name : "Normandie",
        code : "28",
        coordinates : {
            latitude : 49.12,
            longitude : 0.10
        }
    },
    {
        name : "Pays de la Loire",
        code : "52",
        coordinates : {
            latitude : 47.45,
            longitude : -0.79
        }
    },
    {
        name : "Provence-Alpes-Côte d'Azur",
        code : "93",
        coordinates : {
            latitude : 43.93,
            longitude : 6.02
        }
    }
];

export {regionsCoordinates};