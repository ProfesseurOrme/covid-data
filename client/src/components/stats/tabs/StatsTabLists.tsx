import React from "react";
import {
    Tab,
    Tabs
} from "react-bootstrap";
import {
    GeoData
} from "../../../helpers/IAgregateGeo";
import {
    dataCovidState
} from "../../home/Home";
import Lists from "./list/Lists";

type StatsTabListsProps = {
    dataCovid : dataCovidState,
    dataGeo : GeoData
}

const StatsTabLists : React.FunctionComponent<StatsTabListsProps> = (props) => {

    const [key, setKey] = React.useState<string|null>();

    return (
        <Tabs
            id="tab"
            activeKey={key!!}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="departments" title="Départements">
                <Lists
                    listData={{
                        incidence_rate : props.dataCovid.incidence_rate!!.departements,
                        positives_cases : props.dataCovid.positives_cases!!.departements,
                        hospitalizations : props.dataCovid.hospitalizations!!.departements,
                        intensive_care : props.dataCovid.intensive_care!!.departements,
                        total_vaccinated : props.dataCovid.total_vaccinated!!.departements
                    }}
                    dataGeo={props.dataGeo.departments}
                />
            </Tab>
            <Tab eventKey="regions" title="Régions">
                <Lists
                    listData={{
                        incidence_rate : props.dataCovid.incidence_rate!!.regions,
                        positives_cases : props.dataCovid.positives_cases!!.regions,
                        hospitalizations : props.dataCovid.hospitalizations!!.regions,
                        intensive_care : props.dataCovid.intensive_care!!.regions,
                        total_vaccinated : props.dataCovid.total_vaccinated!!.regions
                    }}
                    dataGeo={props.dataGeo.regions}
                />
            </Tab>
        </Tabs>
    )
}

export default StatsTabLists;