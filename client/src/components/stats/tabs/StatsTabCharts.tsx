import React from "react";
import {
    Tab,
    Tabs
} from "react-bootstrap";
import {
    GeoData,
    StateData
} from "../../../helpers/IAgregateGeo";
import {
    dataCovidState
} from "../../Home";
import Lists from "./list/Lists";

type StatsTabChartsProps = {
    dataCovid : dataCovidState,
    dataGeo : GeoData
}

const StatsTabCharts: React.FunctionComponent<StatsTabChartsProps> = (props) => {

    const [key, setKey] = React.useState<string|null>();

    const listDataExemple  = {
        incidence_rate : props.dataCovid.incidence_rate!!.regions,
        positives_cases : props.dataCovid.positives_cases!!.regions,
        hospitalizations : props.dataCovid.hospitalizations!!.regions,
        intensive_care : props.dataCovid.intensive_care!!.regions,
        total_vaccinated : props.dataCovid.total_vaccinated!!.regions
    }

    return (
        <Tabs
            id="tab"
            activeKey={key!!}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="global" title="Global">

            </Tab>
            <Tab eventKey="departments" title="Départements">

            </Tab>
            <Tab eventKey="regions" title="Régions">

            </Tab>
        </Tabs>
    )
}

export default StatsTabCharts;