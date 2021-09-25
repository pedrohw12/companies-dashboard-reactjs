import React from "react";
import clsx from "clsx";

//Material ui components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//Components
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import ContainerWrapper from "../components/Container";
import SimpleTable from "../components/SimpleTable";

//Styles
import { useStyles } from "./styles";

const Home = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <ContainerWrapper title={"Dashboard"}>
      <Grid container>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
      </Grid>
      {/* Recent Transactions */}
      <Grid container className={classes.table}>
        <Grid item xs={12}>
          <SimpleTable />
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default Home;
