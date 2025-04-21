import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, ResponsiveContainer } from 'recharts';

interface DataPoint {
  date: string;
  spend: number;
  impressions: number;
}

interface ChartProps {
  graphData: DataPoint[];
}

const Chart = ({ graphData }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400} className="widget-box">
      <ComposedChart data={graphData}>
        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
        <XAxis dataKey="date" />
        <Legend verticalAlign="top" height={36} />

        {/* Left Y-Axis for Spend */}
        <YAxis
          yAxisId="left"
          label={{ value: 'Spend', angle: 0, position: 'top', offset: 17, dx: 30 }}
          tickFormatter={(v: number) => `$${formatNumber(v)}`}
        />

        {/* Right Y-Axis for Impressions */}
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'Impressions', angle: 0, position: 'top', offset: 17, dx: -30 }}
          tickFormatter={(v: number) => formatNumber(v)}
        />

        <Tooltip
          formatter={(value: number, name: string) => {
            return name === 'Spend' ? [`$${formatNumber(value)}`, name] : [formatNumber(value), name];
          }}
        />

        {/* Impressions Bar */}
        <Bar yAxisId="right" dataKey="impressions" fill="url(#colorImpressions)" name="Impressions" />

        {/* Spend Line */}
        <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#5cc719" name="Spend" dot={{ r: 4 }} />

        <defs>
          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#23b5c6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#23b5c6" stopOpacity={0.2} />
          </linearGradient>
        </defs>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};
