import React from "react";
import {
    Card,
    Container,
    Nav,
    Navbar,
} from "react-bootstrap";
import {
    useTranslation
} from "react-i18next";
import {
    LinkContainer
} from "react-router-bootstrap";

const Header : React.FunctionComponent = () => {

    const {t} = useTranslation();
    return (
        <Card className={"cvd-card cvd-header"}>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand><h1 className={"cvd-card__title title"}>{t("title.main")}</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Accueil</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/search">
                                <Nav.Link>Recherche</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Card>
    )
}

export default Header;