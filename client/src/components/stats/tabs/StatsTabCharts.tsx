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
} from "../../Home";
import ChartGlobal from "./chart/ChartGlobal";
import ChartsState from "./chart/ChartsState";

type StatsTabChartsProps = {
    dataCovid : dataCovidState,
    dataGeo : GeoData
}

const StatsTabCharts: React.FunctionComponent<StatsTabChartsProps> = (props) => {

    const [key, setKey] = React.useState<string|null>();

    return (
        <Tabs
            id="tab"
            activeKey={key!!}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="global" title="Global">
                <ChartGlobal
                   datas={
                       [
                           {
                                data : props.dataCovid.positives_cases!!.france[0],
                                label : "positives_cases"
                           },
                           {
                               data : props.dataCovid.hospitalizations!!.france[0],
                               label : "hospitalizations"
                           },
                           {
                               data : props.dataCovid.total_vaccinated!!.france[0],
                               label : "total_vaccinated"
                           },
                           {
                               data : props.dataCovid.intensive_care!!.france[0],
                               label : "intensive_care"
                           },
                           {
                               data : props.dataCovid.incidence_rate!!.france[0],
                               label : "incidence_rate"
                           }
                       ]
                   }
                />
            </Tab>
            <Tab eventKey="departments" title="Départements">
                <ChartsState
                    datas={
                        [
                            {
                                data : props.dataCovid.positives_cases!!.departements,
                                label : "positives_cases"
                            },
                            {
                                data : props.dataCovid.hospitalizations!!.departements,
                                label : "hospitalizations"
                            },
                            {
                                data : props.dataCovid.total_vaccinated!!.departements,
                                label : "total_vaccinated"
                            },
                            {
                                data : props.dataCovid.intensive_care!!.departements,
                                label : "intensive_care"
                            },
                            {
                                data : props.dataCovid.incidence_rate!!.departements,
                                label : "incidence_rate"
                            }
                        ]
                    }
                    states={props.dataGeo.departments}
                />
            </Tab>
            <Tab eventKey="regions" title="Régions">
                <ChartsState
                    datas={
                        [
                            {
                                data : props.dataCovid.positives_cases!!.regions,
                                label : "positives_cases"
                            },
                            {
                                data : props.dataCovid.hospitalizations!!.regions,
                                label : "hospitalizations"
                            },
                            {
                                data : props.dataCovid.total_vaccinated!!.regions,
                                label : "total_vaccinated"
                            },
                            {
                                data : props.dataCovid.intensive_care!!.regions,
                                label : "intensive_care"
                            },
                            {
                                data : props.dataCovid.incidence_rate!!.regions,
                                label : "incidence_rate"
                            }
                        ]
                    }
                    states={props.dataGeo.regions}
                />
            </Tab>
        </Tabs>
    )
}

export default StatsTabCharts;