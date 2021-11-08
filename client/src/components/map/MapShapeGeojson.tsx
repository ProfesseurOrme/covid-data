import React  from "react";
import {
    Popup,
    GeoJSON
} from 'react-leaflet';
import {
    StateData
} from "../../helpers/IAgregateGeo";
import {
    states
} from "../../helpers/IData";

type MapShapeGeojsonProps = {
    geojsonData : GeoJSON.GeoJsonObject,
    item : StateData,
    data: states | null
}

const MapShapeGeojson : React.FunctionComponent<MapShapeGeojsonProps> = (props) => {

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
        <GeoJSON
            key={props.item.code}
            style={{fillColor : setColor(parseFloat(props.data!!.last_value)), fillOpacity : 0.5, color : "#000", opacity: 0.5}}
            data={props.geojsonData}
        >
            <Popup>
                <p><strong>{props.item.name}</strong></p>
                <p><strong>Taux d'incidence :</strong> {props.data!!.last_value}</p>
            </Popup>
        </GeoJSON>
    )
}

export default MapShapeGeojson;