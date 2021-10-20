import React from "react";
import {
    Card,
    Col
} from "react-bootstrap";
import {
    checkEvolutionVariation
} from "../../utils/fncUtils";
import {
    dataCovidState
} from "../Home";

type StatsColumnProps = {
    dataCovid : dataCovidState
}

const StatsColumn : React.FunctionComponent<StatsColumnProps> = (props) => {

    return (
        <>
            <Col className={"cvd-stats-columns"} lg={"3"}>
                <h4 className={"title"}>Statistiques globales</h4>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Total décès :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_death!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Premières doses :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.first_shot_vaccine!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Totalement vaccinés :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_vaccinated!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Retours à domicile :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_home_returns!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col className={"cvd-stats-columns"} lg={"3"}>
                <h4 className={"title"}>Statistiques hospitalières</h4>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Taux d'incidence :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.incidence_rate!!.france[0].evol_color, props.dataCovid.incidence_rate!!.france[0].last_value, props.dataCovid.incidence_rate!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Cas positifs journaliers :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.positives_cases!!.france[0].evol_color, props.dataCovid.positives_cases!!.france[0].last_value, props.dataCovid.positives_cases!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Patients hospitalisés :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.hospitalizations!!.france[0].evol_color, props.dataCovid.hospitalizations!!.france[0].last_value, props.dataCovid.hospitalizations!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Patients en réanimations :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.intensive_care!!.france[0].evol_color, props.dataCovid.intensive_care!!.france[0].last_value, props.dataCovid.intensive_care!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default StatsColumn;