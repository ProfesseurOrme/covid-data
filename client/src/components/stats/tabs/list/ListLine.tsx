import React from "react";
import {
    StateData
} from "../../../../helpers/IAgregateGeo";
import {
    states
} from "../../../../helpers/IData";
import {
    checkEvolutionVariation
} from "../../../../utils/fncUtils";

export type ListLineProps = {
    data : {
        incidence_rate : states,
        positives_cases : states,
        hospitalizations : states,
        intensive_care : states,
        total_vaccinated : states,
        state : StateData
    } | any
}

const ListLine : React.FunctionComponent<ListLineProps | null> = (props) => {

    return (
        <tr id={props.data.state.code}>
            <td><strong>{props.data.state.name} ({props.data.state.code})</strong></td>
            <td>{checkEvolutionVariation(props.data.incidence_rate.evol_color, props.data.incidence_rate.last_value, props.data.incidence_rate.evol_percentage)}</td>
            <td>{checkEvolutionVariation(props.data.positives_cases.evol_color, props.data.positives_cases.last_value, props.data.positives_cases.evol_percentage)}</td>
            <td>{checkEvolutionVariation(props.data.hospitalizations.evol_color, props.data.hospitalizations.last_value, props.data.hospitalizations.evol_percentage)}</td>
            <td>{checkEvolutionVariation(props.data.intensive_care.evol_color, props.data.intensive_care.last_value, props.data.intensive_care.evol_percentage)}</td>
        </tr>
    )
}

export default ListLine;