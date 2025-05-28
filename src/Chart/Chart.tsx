import { CartesianGrid, LineChart, ResponsiveContainer, Line, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { calcAverage, calcStandardDeviation, calcZScore, getGradientOffset } from "../util";
import { useMemo } from "react";

export interface IChartBar {
  name: string;
  uv: number;
  pv: number;
  amt: number;
  uvZ: number;
  pvZ: number;
}

const data = [
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


export const Chart = () => {
  const mean = useMemo(() => calcAverage(data.map(d => d.uv)), [data]);
  const standardDeviation = useMemo(() => calcStandardDeviation(data.map(d => d.uv)), [data]);
  const enrichedData: IChartBar[] = useMemo(() => data.map(d => ({
    ...d,
    uvZ: calcZScore(d.uv, mean, standardDeviation),
    pvZ: calcZScore(d.pv, mean, standardDeviation),
  })), [data, mean, standardDeviation]);

  const off1 = useMemo(() => getGradientOffset(enrichedData, 'uv', 'uvZ'), [enrichedData]);
  const off2 = useMemo(() => getGradientOffset(enrichedData, 'pv', 'pvZ'), [enrichedData]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={enrichedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} scale={'linear'} />
          <YAxis yAxisId="right" domain={['dataMin', 'dataMax']} scale={'linear'} orientation="right" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="url(#splitColor)" dot={{ fill: "#8884d8" }} activeDot={{ r: 8, fill: "#8884d8" }} yAxisId="left" />
          <Line type="monotone" dataKey="pv" stroke="url(#splitColor2)" dot={{ fill: "#82ca9d" }} yAxisId="left" />
          {/* <Line type="monotone" dataKey="uvZ" stroke="" dot={{ fill: "#82ca9d" }} yAxisId="right" /> */}
          <defs>
            <linearGradient id="splitColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset={off1} stopColor="#ff0000" />
              <stop offset={off1} stopColor="#0000ff" />
            </linearGradient>

            <linearGradient id="splitColor2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset={off2} stopColor="#ff0000" />
              <stop offset={off2} stopColor="#0000ff" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
