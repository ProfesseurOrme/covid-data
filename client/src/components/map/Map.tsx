import React from "react";
import {FrData, getData, GlobalData } from "../../helpers/agregate";
import MapComponent from "./MapComponent";
import {outreMerMetropoleCoordinates} from "../../utils/region-locations";
import  Stats from "../stats/Stats";

const Map : React.FunctionComponent = () => {

    const [data, setData] = React.useState<GlobalData|null>(null);
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

    const styleFr = {
        width: "100%",
        minHeight: "60vh"
    }

    const styleOm = {
        width : "100%",
        height : "250px"
    }

    const renderOutreMerMap = () => {
        if(data !== null) {
            const codeInsee =  ["01", "02", "03", "04", "06"];

            let array : FrData[] = [];

            codeInsee.forEach((value) => {
                let obj : FrData | undefined = data.regions.find(item => item.code === value);
                if(obj !== undefined)
                {
                    array.push(obj)
                }
            })
            return (
                array.map((region) => {
                    return (
                        outreMerMetropoleCoordinates.map((coordinateData) => {
                            if(region.code === coordinateData.code) {
                                return (
                                    <MapComponent
                                        fixed={false}
                                        title={coordinateData.name}
                                        style={styleOm}
                                        key={region.code}
                                        data={[region]}
                                        center={[coordinateData.coordinates.latitude, coordinateData.coordinates.longitude]}
                                        classNameOM={"cvd_map_om"}
                                        properties={{zoom : coordinateData.zoom, minZoom : coordinateData.minZoom}}
                                    >
                                    </MapComponent>
                                )
                            } else {
                                return <></>
                            }
                        })
                    )
                })
            )

        } else {
            return <></>
        }
    }

    if(loaded) {
        return (
            <>
                <div className={"columns is-desktop"}>
                    <div className={"column"}>
                        <div className={"card cvd__card cvd__header"}>
                            <div className={"columns is-mobile"}>
                                <div className={"column"}>
                                    <h1 className={"cvd-card__title"}>Test - Data Covid</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"columns is-desktop"}>
                    <MapComponent
                        fixed={true}
                        title={"Metropole"}
                        style={styleFr}
                        key={"fr"}
                        center={[46.22, 2.21]}
                        data={data!!.departments}
                        properties={{zoom : 5, minZoom : 5}}
                    >
                    </MapComponent>
                    <div className={"colmun"}>

                    </div>
                </div>
                <div className={"columns is-desktop"}>
                    {renderOutreMerMap()}
                </div>
                <div className={"columns is-desktop"}>
                    <div className={"column"}>
                        <Stats data={data!!}>
                        </Stats>
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