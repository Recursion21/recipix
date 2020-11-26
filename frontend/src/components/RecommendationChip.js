import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { titleCase } from "../utils/Mappers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const RecommendationChip = (props) => {
  const classes = useStyles();
  const {
    recommendations,
    setRecommendations,
    ingredientsList,
    setIngredientsList,
  } = props;
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (recommendations.length !== 0) {
      setIsDisabled(false);
    }
  }, [recommendations]);

  useEffect(() => {
    if (ingredientsList.length === 0) {
      setRecommendations([]);
    }
  }, [ingredientsList, setRecommendations]);

  return (
    <div className={classes.root}>
      {recommendations.length !== 0 && (
        <>
          <Typography>Do you have?</Typography>
          {recommendations.map((ingredient) => (
            <Chip
              size="small"
              key={ingredient.name}
              label={titleCase(ingredient.name)}
              onClick={() => {
                setIngredientsList((prevState) => [
                  ...prevState,
                  { value: ingredient.name, label: titleCase(ingredient.name) },
                ]);
                setIsDisabled(true);
              }}
              disabled={isDisabled}
            ></Chip>
          ))}
        </>
      )}
    </div>
  );
};

export default RecommendationChip;
