import React from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { departmentCoordinates } from "../../utils/department-locations";


const country =
    {
        "country" : "France",
        "alpha2" : "FR",
        "alpha3" : "FRA",
        "numeric" : 250,
        "latitude" : 46.22,
        "longitude" : 2.21
    }
;
// const url : string = "https://dashboard.covid19.data.gouv.fr/data/code-FRA.json";

const CountryMap : React.FunctionComponent = () => {

    const [globalData, setGlobalData] = React.useState<Array<any>>([]);
    const [stateAndDepartmentData, setStateAndDepartmentData] = React.useState<Array<any>>([]);
    const [loaded, setLoaded ] = React.useState<boolean>(false);


    React.useEffect(() => {
        getGlobalStatistics();
        agregateDataPerStateAndDepartment();
        setLoaded(true);
    }, [])

    const getGlobalStatistics = async () => {
        await axios.get("http://localhost:3001/api/data/global-statistics")
            .then((res) => {
                setGlobalData(res.data);
            })
            .finally(() => {
                console.log(globalData);
            })
        ;
    }

    const agregateDataPerStateAndDepartment = async () => {
        await axios.get("http://localhost:3001/api/data/incidence-rate")
            .then((res) => {
                setStateAndDepartmentData(res.data);
            })
            .finally(() => {
                console.log(stateAndDepartmentData);
            })
    }

    if(loaded) {
        return (
            <div className="columns">
                <div className="column">
                    <section className="hero">
                        <div className="hero-body">
                            <MapContainer center={[country.latitude, country.longitude]} zoom={6}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {
                                    departmentCoordinates.map((item) => (
                                        <Marker key={item.code} position={[item.coordinates.latitude, item.coordinates.longitude]}>
                                            <Popup>
                                                {item.name}
                                            </Popup>
                                        </Marker>
                                    ))
                                }
                            </MapContainer>
                        </div>
                    </section>
                </div>
            </div>

        )
    } else {
        return (
            <></>
        )
    }
}

export default CountryMap;