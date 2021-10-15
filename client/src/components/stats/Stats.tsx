import React from "react"
import { GlobalData } from "../../helpers/agregate";
import StatsPerState from "./StatsPerState";

type StatsProps = {
    data : GlobalData
}

const Stats : React.FunctionComponent<StatsProps> = (props) => {
    return (
        <article className={"panel is-info"}>

            <p className={"panel-heading"}>
                Statistiques globales
            </p>

            <div className="tabs is-smal">
                <ul>
                    <li className="is-active"><a href={"#departements"}>Départements</a></li>
                    <li><a href={"#regions"}>Régions</a></li>
                </ul>
            </div>
            <div className="panel-block">
                <table className="table">
                    <thead>
                    <tr>
                        <th><abbr title="Played">Pld</abbr></th>
                        <th><abbr title="Won">W</abbr></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>1</th>
                        <td>38</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </article>
    )
}

export default Stats;