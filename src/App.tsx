import React from 'react';
import { Box, grommet, Grommet } from 'grommet';
import { NavBar } from './components/nav-bar';
import { Editor } from './components/editor';

function App() {
  return (
    <Grommet theme={grommet} >
        <Box fill={true}>
          <NavBar />
          <Editor />
        </Box>
    </Grommet>
  );
}

export default App;
