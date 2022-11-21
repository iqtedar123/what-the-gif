import { Box, Chart, Heading } from "grommet";
import React from "react";

interface Props {
  color: string;
  label: string;
  value: number;
}
const LabelledChart = ({ color, label, value }: Props) => (
  <Box flex={false} basis="xsmall" align="center">
    <Chart
      bounds={[
        [0, 2],
        [0, 100],
      ]}
      type="bar"
      values={[{ value: [1, value] }]}
      color={color}
      round
      size={{ height: "medium", width: "xsmall" }}
    />
    <Box align="center">
      <Heading level={4} weight="bold">
        {label}
      </Heading>
    </Box>
  </Box>
);

export default LabelledChart;
