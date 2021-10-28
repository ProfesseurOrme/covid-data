import React from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
} from 'react-leaflet';
import MapShapeGeojson from "./MapShapeGeojson";
import {
    StateData
} from "../../helpers/IAgregateGeo"
import {
    Col
} from "react-bootstrap";
import {
    states
} from "../../helpers/IData"

interface MapProps {
    center : [number, number],
    dataGeo : StateData[],
    dataDptOutreMer ? : StateData,
    classNameOM ? : string,
    style : {},
    properties : {
        zoom : number,
        minZoom : number
    },
    dataIncidence : states[],
    title : string,
    fixed : boolean
}

const Map : React.FunctionComponent<MapProps> = (props) => {

    const renderFeature = (data : Array<StateData>, dataIncidence : states[]) => {

        if(data !== null) {

            return (
                data.map((item) => {
                    return (
                        dataIncidence.map((value) => {
                            const geoJSONData: GeoJSON.GeoJsonObject = item.geojson;
                            if(item.code === value.code_level) {
                                return (
                                    <MapShapeGeojson
                                        key={item.code}
                                        geojsonData={geoJSONData}
                                        data={value}
                                        item={item}
                                    >
                                    </MapShapeGeojson>
                                )
                            } else {
                                return "";
                            }
                        })
                    )
                })
            )

        } else {
            return <></>
        }
    }

    return (
        <Col md >
            <h4 className={"title is-4"}>{props.title}</h4>
            <div className={props.classNameOM ? `${props.classNameOM} card cvd__card` : "card cvd__card"}>
                <MapContainer
                    zoomControl={props.fixed}
                    dragging={props.fixed}
                    doubleClickZoom={props.fixed}
                    scrollWheelZoom={false}
                    style={props.style}
                    center={props.center}
                    zoom={props.properties.zoom}
                    minZoom={props.properties.minZoom}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {renderFeature(props.dataGeo, props.dataIncidence)}
                </MapContainer>
            </div>
        </Col>
    )
}

export default Map;