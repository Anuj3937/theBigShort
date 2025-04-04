"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  {
    name: 'Technology',
    children: [
      { name: 'AAPL', size: 2715, change: 1.2 },
      { name: 'MSFT', size: 2278, change: -0.8 },
      { name: 'GOOGL', size: 1778, change: 0.5 },
      { name: 'AMZN', size: 1634, change: 2.1 },
      { name: 'NVDA', size: 1103, change: 3.5 },
      { name: 'TSLA', size: 857, change: -1.7 },
    ],
  },
  {
    name: 'Healthcare',
    children: [
      { name: 'JNJ', size: 435, change: -0.3 },
      { name: 'UNH', size: 378, change: 1.5 },
      { name: 'PFE', size: 253, change: -1.2 },
      { name: 'ABT', size: 198, change: 0.8 },
      { name: 'MRK', size: 189, change: 2.2 },
    ],
  },
  {
    name: 'Financials',
    children: [
      { name: 'JPM', size: 422, change: 0.7 },
      { name: 'BAC', size: 311, change: -0.5 },
      { name: 'WFC', size: 195, change: 1.8 },
      { name: 'C', size: 150, change: -0.9 },
      { name: 'GS', size: 128, change: 1.1 },
    ],
  },
  {
    name: 'Consumer',
    children: [
      { name: 'PG', size: 345, change: 0.4 },
      { name: 'KO', size: 242, change: -0.2 },
      { name: 'PEP', size: 234, change: 0.9 },
      { name: 'WMT', size: 409, change: -0.6 },
      { name: 'COST', size: 244, change: 1.3 },
    ],
  },
]

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, name, change } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: change > 0 ? `rgba(0, 128, 0, ${0.3 + change / 10})` : `rgba(255, 0, 0, ${0.3 + Math.abs(change) / 10})`,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 - 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={16}
            fontWeight="bold"
          >
            {change > 0 ? '+' : ''}
            {change.toFixed(1)}%
          </text>
        </>
      )}
    </g>
  );
};

export function MarketHeatmap() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Market Heatmap</CardTitle>
        <CardDescription>Visual representation of market performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
              content={<CustomizedContent />}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{`${data.name}`}</p>
        <p>{`Market Cap: $${(data.size / 1000).toFixed(2)}B`}</p>
        <p className={data.change >= 0 ? "text-green-600" : "text-red-600"}>
          {`Change: ${data.change > 0 ? '+' : ''}${data.change.toFixed(2)}%`}
        </p>
      </div>
    );
  }
  return null;
};

