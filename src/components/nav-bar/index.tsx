import React from "react";
import { Anchor, Header, Nav } from "grommet";
import { Github, Twitter } from "grommet-icons/icons";

export const NavBar = () => {
    return (
        <Header direction={"row"} fill={"horizontal"} border={{size: "large", side: "bottom", color: "accent-1" }}>
            <Nav direction="row" >
                <Anchor icon={<Twitter color="black" />} href={"https://twitter.com/iQtedar_C"} target="_" />
                <Anchor icon={<Github color="black" />} href={"https://github.com/iqtedar123"} target="_" />
            </Nav>
        </Header>
    );
};