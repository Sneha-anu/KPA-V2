import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { startCase, camelCase, head } from "lodash";

export const CustomLineCharts = ({ data }) => {
  const COLOR = head(data)
    ? head(data).color
    : { primaryColor: "#115293", secondaryColor: "#5fa6ec" };
  // console.log(COLOR, head(data)?.color, head(data));
  return (
    <ResponsiveContainer className="card" mt={2} width="100%" height="100%">
      <LineChart
        //   className="card"
        //   width={500}
        // height={190}
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 5,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="month" tickFormatter={(text) => text.substr(0, 3)} />
        <YAxis
          tickLine={false}
          tick={false}
          width={2}
          domain={[0, "dataMax + 1"]}
        />
        <Tooltip
          formatter={(value, name, props) => [
            value,
            startCase(camelCase(name)),
          ]}
        />
        {/* <Legend
          wrapperStyle={{ fontSize: "11px", top: "1px" }}
          formatter={(value) => startCase(camelCase(value))}
        /> */}
        <Line
          type="monotone"
          dataKey="completed"
          stroke={COLOR.primaryColor}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="target"
          strokeDasharray="5 2"
          stroke="grey"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
