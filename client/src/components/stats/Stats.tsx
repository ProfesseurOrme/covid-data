import React from "react"
import {
    Card,
} from "react-bootstrap";

interface StatsProps {
    global : boolean
    title: string,
    headerColor : string,
    component : JSX.Element
}

const Stats : React.FunctionComponent<StatsProps> = (props) => {

    return (
        <Card className={"cvd-stats"}>
            <Card.Header as={"h5"} className={"text-white"} style={{
                backgroundColor : props.headerColor
            }}>
                {props.title}
            </Card.Header>
            <Card.Body >
                {props.component}
            </Card.Body>
        </Card>
    )
}

export default Stats;