import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  height: 200px; 
`;

const GaugeChart = ({ value, startAngle, endAngle, maxValue }) => {
  let gaugeColor = '#16a34a';
  if (value / maxValue < 0.3) gaugeColor = '#dc2626';
  else if (value / maxValue < 0.6) gaugeColor = '#facc15';

  return (
    <ChartContainer>
      <Gauge
        value={value}
        valueMax={maxValue}
        startAngle={startAngle}
        endAngle={endAngle}
        sx={{
          [`& .MuiGauge-valueText`]: {
            fontSize: 30,
            fontWeight: 600,
            transform: 'translate(0px, -40px)',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: gaugeColor,
            strokeWidth: 12,
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
    </ChartContainer>
  );
};

export default GaugeChart;
