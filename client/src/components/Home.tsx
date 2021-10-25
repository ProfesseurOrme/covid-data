import React from "react";
import {
    StateData,
    GeoData
} from "../helpers/IAgregateGeo";
import {
    getDataGeo
} from "../helpers/agregateGeo";
import Map from "./map/Map";
import {
    outreMerMetropoleCoordinates
} from "../utils/region-locations";
import  Stats from "./stats/Stats";
import {
    Card,
    Container,
    Row,
    Col
} from "react-bootstrap";
import {
    getStatistics
} from "../apis/data";
import {
    data,
    states
} from "../helpers/IData";
import StatsColumn from "./stats/StatsColumn";
import StatsTabLists from "./stats/tabs/StatsTabLists";
import StatsTabCharts from "./stats/tabs/StatsTabCharts";
import {
    useTranslation
} from "react-i18next";

export type dataCovidState = {
    incidence_rate : data |null,
    positives_cases : data |null,
    hospitalizations : data | null,
    intensive_care : data | null,
    total_death : data | null,
    total_vaccinated : data | null,
    first_shot_vaccine : data | null,
    total_home_returns : data | null
}

const Home : React.FunctionComponent = () => {

    const [dataGeo, setDataGeo] = React.useState<GeoData|any>(null);
    const [dataCovid, setDataCovid] = React.useState<dataCovidState>({
        incidence_rate : null,
        positives_cases : null,
        hospitalizations : null,
        intensive_care : null,
        total_death : null,
        total_vaccinated : null,
        first_shot_vaccine : null,
        total_home_returns : null
    });

    const [loaded, setLoaded ] = React.useState<boolean>(false);

    const {t} = useTranslation();

    React.useEffect(() => {
        setAppData()
            .then(() => {
                setLoaded(true);
            })
    }, [loaded])

    const styleFr = {
        width: "100%",
        minHeight: "70vh"
    }

    const styleOm = {
        width : "100%",
        height : "250px"
    }

    const setAppData = async () => {
        await getStatistics
            .then(res => {
                setDataCovid(res);
            })
        ;

        await getDataGeo()
            .then(res => {
                setDataGeo(res);
            })
        ;
    }

    const renderOutreMerMap = (incidenceRate : states[]) => {
        if(dataGeo !== null) {
            const codeInsee =  ["01", "02", "03", "04", "06"];

            let arrayGeo : StateData[] = [];

            codeInsee.forEach((value) => {
                let objGeo : StateData | undefined = dataGeo.regions.find((item: { code: string; }) => item.code === value);
                if(objGeo !== undefined)
                {
                    arrayGeo.push(objGeo)
                }


            })

            return (
                arrayGeo.map((region) => {
                    return (
                        outreMerMetropoleCoordinates.map((coordinateData) => {
                            if(region.code === coordinateData.code) {
                                let objData : states | undefined = incidenceRate.find((item : {code_level : string}) => item.code_level === region.code);
                                if(objData !== undefined)
                                {
                                    return (

                                        <Map
                                            fixed={false}
                                            title={coordinateData.name}
                                            style={styleOm}
                                            key={region.code}
                                            dataGeo={[region]}
                                            dataIncidence={[objData]}
                                            center={[coordinateData.coordinates.latitude, coordinateData.coordinates.longitude]}
                                            classNameOM={"cvd_map_om"}
                                            properties={{zoom : coordinateData.properties!!.zoom, minZoom : coordinateData.properties!!.minZoom}}
                                        />
                                    )
                                }

                            } else {
                                return <></>
                            }
                        })
                    )
                })
            )

        } else {
            return <></>
        }
    }

    if(loaded) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card className={"cvd-card cvd-header"}>
                                <h1 className={"cvd-card__title title"}>{t("title.main")}</h1>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Map
                            fixed={true}
                            title={"Metropole (Taux d'incidence)"}
                            style={styleFr}
                            key={"fr"}
                            dataIncidence={dataCovid.incidence_rate!!.departements}
                            center={[46.72, 2.21]}
                            dataGeo={dataGeo.departments}
                            properties={{zoom : 6, minZoom : 6}}
                        />
                        <StatsColumn dataCovid={dataCovid!!} />
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        {renderOutreMerMap(dataCovid.incidence_rate!!.regions)}
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <Stats global={false} title={t("title.stats.evolution")} headerColor={"#e76f51"} component={<StatsTabCharts dataGeo={dataGeo} dataCovid={dataCovid}/>}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Stats global={false} title={t("title.stats.global")} headerColor={"#2a9d8f"} component={<StatsTabLists dataGeo={dataGeo} dataCovid={dataCovid}/>}/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Home;