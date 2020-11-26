import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// clicking the request card populates add reccipe page with ingredients?

const RequestCard = (props) => {
  const { request_id, ingredients, count } = props;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6">
          Ingredients
        </Typography>
        <ul>
          {ingredients.map((ingredient) => {
            return <li key={ingredient.name}>{ingredient.name}</li>;
          })}
        </ul>
        <Typography gutterBottom variant="body1">
          Times Requested: {count}
        </Typography>
        <Link href={"/request-recipe/:" + request_id} variant="body2">
          {"Create Recipe"}
        </Link>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
