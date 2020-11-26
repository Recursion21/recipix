import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import getIngredientsApi from "../apis/getIngredientsApi";
import Select from "react-select";
import { mapToCategories } from "../utils/Mappers";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddIngredientForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, handleChange, values, setFieldValue } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getIngredientsApi();
      // console.log({ ingredients: response.data });
      setCategories(mapToCategories(response.data.categories));
    }
    fetchCategories();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h1 style={{ textAlign: "center" }}>Add an Ingredient</h1>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="ingredient"
            id="ingredient"
            label="Enter Ingredient Name"
            autoComplete="ingredient"
            onChange={handleChange}
            value={values.ingredient}
            error={!values.valid}
            helperText={values.valid ? "" : values.error_msg}
          />
          <Select
            placeholder={"Select a Category *"}
            closeMenuOnSelect={true}
            options={categories}
            onChange={async (e) => {
              if (!!e) {
                setFieldValue("category", e);
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Ingredient
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
};

export default AddIngredientForm;
