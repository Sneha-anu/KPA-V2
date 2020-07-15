import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Container } from "@material-ui/core";

import CustomPlaceholder from "./customPlaceholder";
import {
  barGraphData,
  lineGraphData,
  pieChartsData,
  lineGraphDataQuater,
} from "../../Shared/function";
import { fetchUsersWithKpa } from "../../service/apiService";
import { BarCustomChart } from "../../Shared/component/charts/customBarCharts";
import { CustomLineCharts } from "../../Shared/component/charts/customLineCharts";
import { CustomPieCharts } from "../../Shared/component/charts/customPieCharts";
import Profile from "./profile";
import RecentActivities from "./recentActivities";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  chart: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 200,
  },
  profileList: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [data, setData] = useState({ profile: [], kpaCreation: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({ showBy: "", choice: [] });
  const [optionLine, setOptionLine] = useState({ showBy: "", choice: [] });
  const [optionsPie, setOptionsPie] = useState({
    showBy: "",
    choice: [],
  });
  async function fetchData() {
    setIsLoading(true);
    try {
      const [profile, kpaCreation] = await fetchUsersWithKpa();
      // const dumm = await fetchUserProfile();
      // console.log(profile, kpaCreation, "init");
      setData({ profile: profile.data, kpaCreation: kpaCreation.data });
      profile.data.forEach((element) => {
        setOptions({
          choice: Object.keys(element.target_kpa).map((el) => {
            return { id: el, value: el };
          }),
          showBy: "component",
        });
        setOptionLine({
          choice: Object.keys(element.target_kpa).map((el) => {
            return { id: el, value: el };
          }),
          showBy: "component",
        });
        setOptionsPie({
          choice: [
            ...Object.keys(element.target_kpa).map((el) => {
              return { id: el, value: el };
            }),
            { id: "", value: "Overall" },
          ],
          showBy: "",
        });
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // snackBarRef.current.handleClick(error.message, "error");
        console.log(error.toJSON());
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  const profileSubmit = () => {
    fetchData();
  };
  const handleChange = (event) => {
    setOptions((state, props) => {
      return { ...state, showBy: event.target.value };
    });
  };
  const handleLineChart = (event) => {
    setOptionLine((state, props) => {
      return { ...state, showBy: event.target.value };
    });
  };
  const handlePieChart = (event) => {
    setOptionsPie((state, props) => {
      return { ...state, showBy: event.target.value };
    });
  };
  // console.log(props);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <CustomPlaceholder
            id="bar"
            label="Break Down"
            {...options}
            color={
              barGraphData(data.profile, options.showBy, data.kpaCreation)[1]
            }
            handleChange={handleChange}
          >
            <BarCustomChart
              data={barGraphData(
                data.profile,
                options.showBy,
                data.kpaCreation
              )}
            />
          </CustomPlaceholder>
        </Grid>
        <Grid item xs={4}>
          {/* <CustomPlaceholder id="line" label="Latter Lines" {...options}>
            <CustomLineCharts
              data={lineGraphData(data.profile, "component", data.kpaCreation)}
            />
          </CustomPlaceholder> */}
          <CustomPlaceholder
            id="line"
            label="Latter Lines"
            {...optionLine}
            color={
              lineGraphDataQuater(
                data.profile,
                optionLine.showBy,
                data.kpaCreation
              )[0]
            }
            handleChange={handleLineChart}
          >
            <CustomLineCharts
              data={lineGraphDataQuater(
                data.profile,
                optionLine.showBy,
                data.kpaCreation
              )}
            />
          </CustomPlaceholder>
        </Grid>
        <Grid item xs={4}>
          <CustomPlaceholder
            id="pie"
            label="Overall Progress"
            {...optionsPie}
            handleChange={handlePieChart}
          >
            <CustomPieCharts
              data={pieChartsData(
                data.profile,
                optionsPie.showBy,
                data.kpaCreation
              )}
            />
          </CustomPlaceholder>
        </Grid>
        <Grid item xs={8}>
          <Profile
            data={data.profile}
            loading={isLoading}
            kpaCreation={data.kpaCreation}
            profileSubmit={profileSubmit}
          />
        </Grid>
        <Grid item xs={4}>
          <RecentActivities data={data.profile} loading={isLoading} />
        </Grid>
      </Grid>
    </Container>
  );
}
