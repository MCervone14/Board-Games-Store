"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const RadarChartComponent = ({ data }: any) => {
  const renderCustomizedTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill="#050505"
        dy={-10}
        fontSize={12}
      >
        {payload.value}
      </text>
    );
  };

  const renderRadiusTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} textAnchor="middle" fontWeight="semi-bold">
        {payload.value}
      </text>
    );
  };

  return (
    <div>
      <RadarChart
        cx={250}
        cy={220}
        outerRadius={130}
        width={500}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          style={{ fontSize: "14px" }}
          tick={renderCustomizedTick}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 10]}
          tickCount={10}
          tick={renderRadiusTick}
        />
        <Radar
          name="Categories"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
};

export default RadarChartComponent;
