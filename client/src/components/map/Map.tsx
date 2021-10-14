import React from "react";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { getData, GlobalData } from "../../helpers/agregate";
import MapLocation from "./MapState";

const Map : React.FunctionComponent = () => {


    const [data, setData] = React.useState<GlobalData|null>(null);
    const [selectType, setSelectType] = React.useState<string>("departments");
    const [loaded, setLoaded ] = React.useState<boolean>(false);


    React.useEffect(() => {
        getData()
            .then((res) => {
                setData(res)
            })
            .then(() => {
                setLoaded(true);
            })
    }, [loaded])

    const changeSelectDataType = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setSelectType(value);
        setLoaded(false);
    }


    if(loaded) {
        return (
            <>
                <div className="columns is-mobile">
                    <div className="column">
                        <div className="card cvd__card cvd__header">
                            <div className="card-content">
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <p className="title is-4 cvd-card__title">John Smith</p>
                                    </div>
                                    <div className="column">
                                        <div className="select">
                                            <select onChange={changeSelectDataType}>
                                                <option value={"departments"}>Departments</option>
                                                <option value={"regions"}>Regions</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns is-mobile">
                    <div className="column">
                        <div className="card cvd__card">
                            <MapContainer center={[46.22, 2.21]} zoom={6} minZoom={6}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {
                                    data !== null ?

                                        <>{
                                            setSelectType === "departments" ?
                                                {
                                                    data.departments.map((item) => {
                                                        const geoJSONData: GeoJSON.GeoJsonObject = item.geojson;

                                                        return (
                                                            <MapLocation key={item.code} geojsonData={geoJSONData}
                                                                         item={item}>
                                                            </MapLocation>
                                                        )

                                                    })
                                                }
                                                :
                                                {
                                                    data.regions.map((item) => {
                                                        const geoJSONData: GeoJSON.GeoJsonObject = item.geojson;

                                                        return (
                                                            <MapLocation key={item.code} geojsonData={geoJSONData}
                                                                         item={item}>
                                                            </MapLocation>
                                                        )

                                                    })
                                                }
                                        }
                                    </>
                                    :
                                        <></>
                                }
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Map;