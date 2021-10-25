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
    states
} from "../../../../helpers/IData";
import {
    reformatDate
} from "../../../../utils/miscFunctions";

type ChartGlobalProps = {
    datas : ChartGlobalPropsValues[]

}

type ChartGlobalPropsValues = {
    data : states,
    label : string
}

const ChartGlobal : React.FunctionComponent<ChartGlobalProps> = (props) => {

    const [selectValue, setSelectValue] = React.useState<string>("positives_cases");

    const {t} = useTranslation();

    const setData  = (datas : ChartGlobalPropsValues[]) => {

        let obj = datas.find((o: { label: string; }) => o.label === selectValue);

        if(typeof obj !== "undefined")
            return obj;
        else
            return null
    }

    const data = () => {

        const dataset : ChartGlobalPropsValues | null= setData(props.datas);

        return {
            labels: dataset!!.data.values.map((item) => reformatDate(item.date)),
            datasets: [
                {
                    label: t(`graph.label.${dataset!!.label}`),
                    data: dataset!!.data.values.map((item) => (item.value)),
                    fill: true,
                    backgroundColor: 'rgb(231, 111, 81)',
                },
            ]
        }
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(event.target.value);
    }

    return (
        <>
            <Row>
                <Col className={"cvd-graph-select"}>
                    <FloatingLabel controlId="floatingSelect" label="Sélectionnez un jeu de données">
                        <Form.Select aria-label="selection d'un jeu de données" onChange={handleChange}>
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
                    <Line data={data} options={options}/>
                </Col>
            </Row>
        </>
    )
}

export default ChartGlobal;