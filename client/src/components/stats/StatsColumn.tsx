import React from "react";
import {
    Card,
    Col
} from "react-bootstrap";
import {
    useTranslation
} from "react-i18next";
import {
    checkEvolutionVariation
} from "../../utils/fncUtils";
import {
    dataCovidState
} from "../home/Home";

type StatsColumnProps = {
    dataCovid : dataCovidState
}

const StatsColumn : React.FunctionComponent<StatsColumnProps> = (props) => {

    const {t} = useTranslation();

    return (
        <>
            <Col className={"cvd-stats-columns"} lg={"3"}>
                <h4 className={"title"}>{t("stats.titles.global")}</h4>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.total_death")} :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_death!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.first_shot_vaccine")} :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.first_shot_vaccine!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.total_vaccinated")} :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_vaccinated!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.total_home_returns")} :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_home_returns!!.france[0].last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col className={"cvd-stats-columns"} lg={"3"}>
                <h4 className={"title"}>{t("stats.titles.hospital")}</h4>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.incidence_rate")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.incidence_rate!!.france[0].evol_color, props.dataCovid.incidence_rate!!.france[0].last_value, props.dataCovid.incidence_rate!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.positives_cases")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.positives_cases!!.france[0].evol_color, props.dataCovid.positives_cases!!.france[0].last_value, props.dataCovid.positives_cases!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.hospitalizations")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.hospitalizations!!.france[0].evol_color, props.dataCovid.hospitalizations!!.france[0].last_value, props.dataCovid.hospitalizations!!.france[0].evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.intensive_care")} :
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