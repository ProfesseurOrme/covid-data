import React from "react"
import {
    Table
} from "react-bootstrap";
import {
    useTranslation
} from "react-i18next";
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

    const {t} = useTranslation();

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
                    <th>{t("graph.tables.thead.name")}</th>
                    <th>{t("graph.tables.thead.incidence_rate")}</th>
                    <th>{t("graph.tables.thead.positives_cases")}</th>
                    <th>{t("graph.tables.thead.hospitalizations")}</th>
                    <th>{t("graph.tables.thead.intensive_care")}</th>
                </tr>
            </thead>
            <tbody>
                {renderStats(props.listData, props.dataGeo)}
            </tbody>
        </Table>
    )
}

export default Lists;