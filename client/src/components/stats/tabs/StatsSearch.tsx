import React from "react";
import {
    ISearchResult
} from "../../search/SearchResult.js";
import ChartGlobal from "./chart/ChartGlobal";

type StatsTabChartsProps = {
    dataCovid : ISearchResult
}

const StatsSearch : React.FunctionComponent<StatsTabChartsProps> = (props) => {
     return (
         <ChartGlobal
             datas={
                 [
                     {
                         data : props.dataCovid.region_data.positives_cases,
                         label : "positives_cases"
                     },
                     {
                         data : props.dataCovid.region_data.hospitalizations,
                         label : "hospitalizations"
                     },
                     {
                         data : props.dataCovid.region_data.total_vaccinated,
                         label : "total_vaccinated"
                     },
                     {
                         data : props.dataCovid.region_data.intensive_care,
                         label : "intensive_care"
                     },
                     {
                         data : props.dataCovid.region_data.incidence_rate,
                         label : "incidence_rate"
                     }
                 ]
             }
         />
     )
}

export default StatsSearch;