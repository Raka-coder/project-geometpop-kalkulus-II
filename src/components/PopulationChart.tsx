
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface PopulationChartProps {
  populationData: number[];
  carryingCapacity?: number;
}

const PopulationChart = ({
  populationData,
  carryingCapacity,
}: PopulationChartProps) => {
  const [chartData, setChartData] = useState<
    { period: number; population: number }[]
  >([]);

  useEffect(() => {
    // Transform the raw population data into the format expected by Recharts
    // Do not round the values to maintain precision
    const formattedData = populationData.map((population, index) => ({
      period: index,
      population: population, // Use exact value without rounding
    }));

    setChartData(formattedData);
  }, [populationData]);

  const formatPopulation = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    } else {
      return value.toFixed(2); // Show 2 decimal places but don't round in calculations
    }
  };

  return (
    <div className="w-full h-[300px] md:h-[400px] font-nunitosans">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="period"
            label={{
              value: 'Periode Waktu',
              position: 'insideBottom',
              offset: -5,
            }}
            tick={{ fill: '#333333' }}
          />
          <YAxis
            tickFormatter={formatPopulation}
            label={{
              value: 'Ukuran Populasi',
              angle: -90,
              position: 'insideLeft',
            }}
            tick={{ fill: '#333333' }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={(value) => [`${value} individu`, 'Populasi']}
            labelFormatter={(label) => `Periode: ${label}`}
            contentStyle={{
              backgroundColor: '#14213d',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
            }}
            itemStyle={{ color: '#fca311' }}
            labelStyle={{
              color: '#ffffff',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Line
            type="monotone"
            dataKey="population"
            stroke="#fca311"
            strokeWidth={2}
            dot={{ r: 3, fill: '#fca311', stroke: '#14213d' }}
            activeDot={{ r: 6, stroke: '#14213d', strokeWidth: 1 }}
            name="Populasi"
          />
          {carryingCapacity && carryingCapacity > 0 && (
            <ReferenceLine
              y={carryingCapacity}
              stroke="#14213d"
              strokeDasharray="3 3"
              label={{
                value: `Daya Dukung: ${formatPopulation(carryingCapacity)}`,
                position: 'insideTopRight',
                fill: '#14213d',
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
