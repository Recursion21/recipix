import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import deleteRecipeApi from "../apis/deleteRecipeApi";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  media: {
    height: 140,
  },
});

const RecipeCard = (props) => {
  const { title, imagePath, recipeId, canEdit, history } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          style={{ height: 150 }}
          className={classes.media}
          image={"data:image/png;base64," + imagePath}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item>
            <Button
              onClick={() => window.open(`/recipe/:${recipeId}`)}
              target="_blank"
              color="primary"
            >
              View Recipe
            </Button>
          </Grid>
          <Grid item>
            {canEdit && (
              <IconButton
                type="submit"
                variant="text"
                color="primary"
                aria-label="edit"
                size="small"
                onClick={() => {
                  history.push("/edit-recipe/:" + recipeId);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {canEdit && (
              <IconButton
                type="submit"
                variant="text"
                color="secondary"
                onClick={async () => {
                  //console.log({ recipe_id: recipeId });
                  await deleteRecipeApi({ recipe_id: recipeId });
                  window.location.reload();
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default withRouter(RecipeCard);
