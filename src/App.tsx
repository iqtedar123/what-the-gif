import React from "react";
import { Box, grommet, Grommet } from "grommet";
import { NavBar } from "./components/nav-bar";
import { Editor } from "./components/editor";
import Poll from "./components/poll/Poll";

function App() {
  return (
    <Grommet theme={grommet} themeMode={"auto"}>
      <Box fill={true} gap="small" align="center">
        <NavBar />
        <Editor />
        <Poll pollName={"GIF/JIF Name"} />
      </Box>
    </Grommet>
  );
}

export default App;
