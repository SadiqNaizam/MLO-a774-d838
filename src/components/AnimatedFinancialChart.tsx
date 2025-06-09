import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// framer-motion can be used for more complex animations if needed by wrapping elements

// Example data - replace with actual data fetching and props
const exampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

interface AnimatedFinancialChartProps {
  data?: { name: string; value: number }[];
  title?: string;
  lineColor?: string;
}

const AnimatedFinancialChart: React.FC<AnimatedFinancialChartProps> = ({
  data = exampleData,
  title = "Financial Overview",
  lineColor = "#8884d8", // Default Recharts line color
}) => {
  console.log("Rendering AnimatedFinancialChart with title:", title);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }} // Adjusted left margin for YAxis
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              formatter={(value: number) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value), "Value"]}
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}
              // Example of simple animation using rechart's built-in capabilities
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AnimatedFinancialChart;