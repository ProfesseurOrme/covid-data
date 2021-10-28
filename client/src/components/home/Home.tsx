import React from "react";
import {
    StateData,
    GeoData
} from "../../helpers/IAgregateGeo";
import Map from "../map/Map";
import {
    outreMerMetropoleCoordinates
} from "../../utils/region-locations";
import  Stats from "../stats/Stats";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";
import {
    states
} from "../../helpers/IData";
import StatsColumn from "../stats/StatsColumn";
import StatsTabLists from "../stats/tabs/StatsTabLists";
import StatsTabCharts from "../stats/tabs/StatsTabCharts";
import {
    useTranslation
} from "react-i18next";
import {
    dataCovidState
} from "../App";

type HomeProps = {
    dataCovid : dataCovidState,
    dataGeo : GeoData
}

const Home : React.FunctionComponent<HomeProps> = (props) => {


    const {t} = useTranslation();

    const renderOutreMerMap = (incidenceRate : states[]) => {
        if(props.dataGeo !== null) {
            const codeInsee =  ["01", "02", "03", "04", "06"];

            let arrayGeo : StateData[] = [];

            codeInsee.forEach((value) => {
                let objGeo : StateData | undefined = props.dataGeo.regions.find((item: { code: string; }) => item.code === value);
                if(objGeo !== undefined)
                {
                    arrayGeo.push(objGeo)
                }


            })

            let objData : any[] = [];

            arrayGeo.forEach((region) => {
                outreMerMetropoleCoordinates.forEach((coordinateData) => {
                    if (region.code === coordinateData.code) {
                        let obj: states | undefined = incidenceRate.find((item: { code_level: string }) => item.code_level === region.code);
                        objData.push(
                            {
                            data: obj,
                            geo: coordinateData,
                            region : region
                            }
                        );
                    }
                })
            })

            if(objData.length > 0) {
                return (
                    objData.map(item => {
                        return(
                            <Map
                                fixed={false}
                                title={item.geo.name}
                                style={styleOm}
                                key={item.region.code}
                                dataGeo={[item.region]}
                                dataIncidence={[item.data]}
                                center={[item.geo.coordinates.latitude, item.geo.coordinates.longitude]}
                                classNameOM={"cvd_map_om"}
                                properties={{zoom : item.geo.properties!!.zoom, minZoom : item.geo.properties!!.minZoom}}
                            />
                        )
                    })
                )
            }
        } else {
            return <></>
        }
    }

    const styleFr = {
        width: "100%",
        minHeight: "70vh"
    }

    const styleOm = {
        width : "100%",
        height : "250px"
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Map
                        fixed={true}
                        title={"Metropole (Taux d'incidence)"}
                        style={styleFr}
                        key={"fr"}
                        dataIncidence={props.dataCovid.incidence_rate!!.departements}
                        center={[46.72, 2.21]}
                        dataGeo={props.dataGeo.departments}
                        properties={{zoom : 6, minZoom : 6}}
                    />
                    <StatsColumn dataCovid={props.dataCovid!!} />
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    {renderOutreMerMap(props.dataCovid.incidence_rate!!.regions)}
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <Stats global={false} title={t("title.stats.evolution")} headerColor={"#e76f51"} component={<StatsTabCharts dataGeo={props.dataGeo} dataCovid={props.dataCovid}/>}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Stats global={false} title={t("title.stats.global")} headerColor={"#2a9d8f"} component={<StatsTabLists dataGeo={props.dataGeo} dataCovid={props.dataCovid}/>}/>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Home;