import React from "react";
import { Anchor, Header, Nav } from "grommet";
import { Github, Twitter } from "grommet-icons/icons";
import { Linkedin, CircleInformation } from "grommet-icons";

export const NavBar = () => {
  return (
    <Header
      direction={"row"}
      fill={"horizontal"}
      border={{ size: "large", side: "bottom", color: "accent-1" }}
    >
      <Nav direction="row">
        <Anchor
          icon={<Twitter color="black" />}
          href={"https://twitter.com/iQtedar_C"}
          target="_"
        />
        <Anchor
          icon={<Github color="black" />}
          href={"https://github.com/iqtedar123"}
          target="_"
        />
        <Anchor
          icon={<Linkedin color="black" />}
          href={"https://www.linkedin.com/in/mohammad-chowdhry-74baba10a/"}
          target="_"
        />
        <Anchor
          icon={<CircleInformation color="black" />}
          href={"https://techmeister.web.app"}
          target="_"
        />
      </Nav>
    </Header>
  );
};
