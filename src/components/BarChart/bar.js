import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({ faultProbabilities }) {
  if (!faultProbabilities || faultProbabilities.length === 0) return null;

  const groups = faultProbabilities.map(f => f.name);
  const values = faultProbabilities.map(f => f.value);

  return (
    <BarChart
      xAxis={[{ data: groups }]}
      series={[{ data: values }]}
      height={300}
    />
  );
}
