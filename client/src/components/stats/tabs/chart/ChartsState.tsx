import React from "react";
import {
    Col,
    FloatingLabel,
    Form,
    Row
} from "react-bootstrap";
import {
    Line
} from "react-chartjs-2";
import {
    useTranslation
} from "react-i18next";
import {
    StateData
} from "../../../../helpers/IAgregateGeo";
import {
    states
} from "../../../../helpers/IData";
import {
    reformatDate
} from "../../../../utils/miscFunctions";

type ChartsStateProps = {
    datas : ChartsStatePropsValues[],
    states : StateData[]

}

type ChartsStatePropsValues = {
    data : states[],
    label : string
}

const ChartsState : React.FunctionComponent<ChartsStateProps> = (props) => {

    const [selectState, setSelectState] = React.useState<string>("");
    const [selectData, setSelectData] = React.useState<string>("");

    const {t} = useTranslation();

    const setData = () => {

        let obj : ChartsStatePropsValues | undefined = props.datas.find((o : {label: string}) => o.label === selectData)


        if(typeof  obj !== "undefined") {
            let objGeoData : states | undefined =  obj.data.find((o : {code_level: string}) => o.code_level=== selectState);
            if(typeof  objGeoData !== "undefined") {
                return {
                    labels: objGeoData.values.map((item: { date: any; }) => item.date),
                    datasets: [
                        {
                            label: t(`graph.label.${obj.label}`),
                            data: objGeoData.values.map((item: { value: any; }) => (item.value)),
                            fill: true,
                            backgroundColor: 'rgb(231, 111, 81)',
                        },
                    ]
                }
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    const renderChart = () => {
        const data = setData();

        if(typeof data !== "undefined") {
            return (
                <Line data={data} options={options} />
            )
        }
        return <></>
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            <Row>
                <Col className={"cvd-graph-select"}>
                    <FloatingLabel controlId="floatingSelect" label={t("graph.select.label.state")}>
                        <Form.Select aria-label={t("graph.select.label.state")} onChange={(event : React.ChangeEvent<HTMLSelectElement>) => setSelectState(event.target.value)}>
                            <option key={0} value={""}>-- {t("graph.select.label.state")} --</option>
                            {
                                props.states.map((item) => (
                                    <option key={item.code} value={item.code}>{item.code} - {item.name}</option>
                                ))
                            }
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            {
                (selectState !== "") ?
                    <>
                        <Row>
                            <Col className={"cvd-graph-select"}>
                                <FloatingLabel controlId="floatingSelect" label={t("graph.select.label.data")}>
                                    <Form.Select aria-label={t("graph.select.label.data")} onChange={(event : React.ChangeEvent<HTMLSelectElement>) => setSelectData(event.target.value)}>
                                        <option key={0} value={""}>-- {t("graph.select.label.data")} --</option>
                                        {
                                            props.datas.map((item) => (
                                                <option key={item.label} value={item.label}>{t(`graph.select.options.${item.label}`)}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"cvd-graph-container"}>
                                {
                                    ((selectState && selectData) !== "") ?
                                        renderChart()
                                        :
                                        <></>
                                }
                            </Col>
                        </Row>
                        </>
                    :
                    <></>
            }
        </>
    )
}

export default ChartsState;