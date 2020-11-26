import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const CentreColumn = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Paper className={classes.paper}>{children}</Paper>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default CentreColumn;
