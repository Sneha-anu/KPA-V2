import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { startCase, camelCase } from "lodash";

// const COLORS1 = ["#1976d2", "#f44336", "#ff9800", "#4caf50"];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
function getColors(name) {
  const [type, subType] = name.split("-");
  switch (subType) {
    case "T":
      return DATACOLORS[type].light;
    case "C":
      return DATACOLORS[type].dark;
    case "P":
      return DATACOLORS[type].main;
    default:
      return DATACOLORS[type].main;
  }
}

function getName(name) {
  const [type, subType] = name.split("-");
  switch (subType) {
    case "T":
      return "Target";
    case "C":
      return "Completed";
    case "P":
      return "Pending";
    default:
      return "Target";
  }
}

const DATACOLORS = {
  component: { main: "#1976d2", dark: "#115293", light: "#5fa6ec" },
  Tech_session: { dark: "#d32f2f", main: "#f44336", light: "#e57373" },
  Master_class: { dark: "#ffd600", main: "#ffea00", light: "#fff9b3" },
  case_study: { dark: "#388e3c", main: "#4caf50", light: "#81c784" },
};

const getCustomTooltip = (name) => {
  let nameArr = name.split("-");
  var lastName = "";
  switch (nameArr[1]) {
    case "T":
      lastName = "Net Yet Started";
      break;
    case "C":
      lastName = "Completed";
      break;
    case "P":
      lastName = "In Progess";
      break;
    default:
      lastName = "";
      break;
  }
  return startCase(camelCase(nameArr[0])) + " " + lastName;
};

const getCustomLegend = (data01, data02) => {
  const data1 = data01 || [];
  const data2 = data02 || [];
  if (data1.length === 0) {
    return null;
  }
  return data1.length > 1
    ? data01.map((el) => {
        return {
          id: el.name,
          value: startCase(camelCase(el.name)),
          color: DATACOLORS[el.name].main,
        };
      })
    : data02.map((el) => {
        return {
          id: el.name,
          value: getName(el.name),
          color: getColors(el.name),
        };
      });
};

export const CustomPieCharts = ({ data }) => {
  const [data01, data02] = data;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart
        margin={{
          top: 20,
        }}
      >
        <Pie
          data={data01}
          dataKey="value"
          outerRadius={60}
          paddingAngle={data01 ? (data01.length > 1 ? 5 : 0) : 0}
          fill="#8884d8"
        >
          {data01 &&
            data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={DATACOLORS[entry.name].dark} />
            ))}
        </Pie>
        <Legend
          wrapperStyle={{ fontSize: "11px", top: "0" }}
          payload={
            getCustomLegend(data01, data02)
            // data01 &&
            // data01.map((el) => {
            //   return {
            //     id: el.name,
            //     value: startCase(camelCase(el.name)),
            //     color: DATACOLORS[el.name].main,
            //   };
            // })
          }
        />
        <Pie
          data={data02}
          paddingAngle={5}
          dataKey="value"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
        >
          {data02 &&
            data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColors(entry.name)} />
            ))}
        </Pie>

        <Tooltip
          formatter={(value, name, props) => [value, getCustomTooltip(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
