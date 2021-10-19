import React from "react"
import { Card, Tab, Tabs } from "react-bootstrap";
import { GeoData } from "../../helpers/IAgregateGeo";

interface StatsProps {
    data : GeoData
}

const Stats : React.FunctionComponent<StatsProps> = (props) => {

    const [key, setKey] = React.useState<string|null>();
    return (
        <Card>
            <Card.Header>
                Statistiques globales
            </Card.Header>
            <Card.Body>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key!!}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Home">
                        {"Test"}
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                        {'Test 2'}
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    )
}

export default Stats;