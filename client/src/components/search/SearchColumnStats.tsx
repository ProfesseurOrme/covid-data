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
    Data
} from "./Search";

type StatsColumnProps = {
    dataCovid : Data
}

const SearchColumnStats : React.FunctionComponent<StatsColumnProps> = (props) => {

    const {t} = useTranslation();

    return (
        <>
            <Col className={"cvd-stats-columns"} lg={"3"}>
                <h4 className={"title"}>{t("stats.titles.global")}</h4>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.first_shot_vaccine")} :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.first_shot_vaccine.last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.incidence_rate")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.incidence_rate.evol_color, props.dataCovid.incidence_rate.last_value, props.dataCovid.incidence_rate.evol_percentage) }
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.positives_cases")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.positives_cases.evol_color, props.dataCovid.positives_cases.last_value, props.dataCovid.positives_cases.evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col className={"cvd-stats-columns"} lg={"3"}>
                <h4 className={"title"}>{t("stats.titles.hospital")}</h4>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.first_shot_vaccine")} :
                        </Card.Title>
                        <Card.Text>
                            {parseInt(props.dataCovid.total_vaccinated.last_value).toLocaleString("en")}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.hospitalizations")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.hospitalizations.evol_color, props.dataCovid.hospitalizations.last_value, props.dataCovid.hospitalizations.evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {t("stats.labels.intensive_care")} :
                        </Card.Title>
                        <Card.Text>
                            {checkEvolutionVariation(props.dataCovid.intensive_care.evol_color, props.dataCovid.intensive_care.last_value, props.dataCovid.intensive_care.evol_percentage)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default SearchColumnStats;