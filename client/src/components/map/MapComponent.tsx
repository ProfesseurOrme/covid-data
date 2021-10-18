import React from "react";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import MapShapeGeojson from "./MapShapeGeojson";
import {FrData} from "../../helpers/agregate"
import { Col } from "react-bootstrap";

interface MapComponentProps {
    center : [number, number],
    data : FrData[],
    dataDptOutreMer ? : FrData,
    classNameOM ? : string,
    style : {},
    properties : {
        zoom : number,
        minZoom : number
    },
    title : string,
    fixed : boolean
}

const MapComponent : React.FunctionComponent<MapComponentProps> = (props) => {

    const renderFeature = (data : Array<FrData>) => {

        if(data !== null) {

            return (
                data.map((item) => {

                    return (<></>)

                    /*
                    const geoJSONData: GeoJSON.GeoJsonObject = item.geojson;

                    return (
                        <MapShapeGeojson
                            key={item.code}
                            geojsonData={geoJSONData}

                            item={item}
                        >
                        </MapShapeGeojson>
                    ) */

                })
            )

        } else {
            return <></>
        }
    }

    return (
        <Col>
            <h4 className={"title is-4"}>{props.title}</h4>
            <div className={props.classNameOM ? `${props.classNameOM} card cvd__card` : "card cvd__card"}>
                <MapContainer
                    zoomControl={props.fixed}
                    dragging={props.fixed}
                    doubleClickZoom={props.fixed}
                    scrollWheelZoom={props.fixed}
                    style={props.style}
                    center={props.center}
                    zoom={props.properties.zoom}
                    minZoom={props.properties.minZoom}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {renderFeature(props.data)}
                </MapContainer>
            </div>
        </Col>
    )
}

export default MapComponent;