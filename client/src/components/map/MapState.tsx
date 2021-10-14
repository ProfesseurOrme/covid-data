import React  from "react";
import { Popup, GeoJSON } from 'react-leaflet';
import {FrData} from "../../helpers/agregate";

type MapLocationProps = {
    geojsonData : GeoJSON.GeoJsonObject,
    item : FrData
}

const MapLocation : React.FunctionComponent<MapLocationProps> = (props) => {

    const setColor = (rate : number) : string => {
        if(rate >= 50 && rate <150 ) {
            return "orange";
        } else if(rate >= 150 && rate < 250) {
            return "red";
        } else if(rate >= 250) {
            return "black";
        } else {
            return "green";
        }
    }

    return (
        <GeoJSON key={props.item.code} style={{color : setColor(parseInt(props.item.incidence_rate.last_value))}} data={props.geojsonData}>
            <Popup>
                <p>{props.item.name}</p>
                <button
                    id="button"
                    className="btn btn-primary"
                >
                    More Info
                </button>
            </Popup>
        </GeoJSON>
    )
}

export default MapLocation;