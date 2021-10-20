import React from "react"
import {
    Table
} from "react-bootstrap";
import {
    StateData
} from "../../../../helpers/IAgregateGeo";
import {
    states
} from "../../../../helpers/IData";
import ListLine from "./ListLine";

type ListsProps = {
    listData : ListData,
    dataGeo : StateData[]
}

type ListData = {
    incidence_rate : states[],
    positives_cases : states[],
    hospitalizations : states[],
    intensive_care : states[],
    total_vaccinated : states[]
}

type Data = {
    incidence_rate : states,
    positives_cases : states,
    hospitalizations : states,
    intensive_care : states,
    total_vaccinated : states,
    state : StateData
}

const Lists : React.FunctionComponent<ListsProps> = (props) => {

    const renderStats = (listData : ListData  , dataGeo : StateData[]) => {
        return (
            dataGeo.map((itemGeo) => {
                let newObj : Data | any = {};
                Object.entries(listData).forEach(([key, datas]) =>  {

                    datas.forEach((data) => {
                        if(itemGeo.code === data.code_level) {
                            newObj = {
                                ...newObj,
                                [key]: data,
                            }
                        }
                    })
                });

                newObj = {
                    ...newObj,
                    state : itemGeo
                }

                return (
                    <ListLine key={itemGeo.code} data={newObj}/>
                )
            })
        )
    }

    return (
        <Table responsive={"sm"} size={"sm"}>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Taux d'incidence</th>
                    <th>Cas positifs</th>
                    <th>Pt. Hospitalisés</th>
                    <th>Pt .Réanimation</th>
                </tr>
            </thead>
            <tbody>
                {renderStats(props.listData, props.dataGeo)}
            </tbody>
        </Table>
    )
}

export default Lists;