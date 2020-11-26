import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Notfound from "./components/Notfound";
import Navbar from "./components/Navbar";
import CentreColumn from "./components/CentreColumn";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import AddRecipePage from "./pages/AddRecipePage";
import LoginPage from "./pages/LoginPage";
import Recipe from "./pages/Recipe";
import SignUpPage from "./pages/SignUpPage";
import AddIngredientPage from "./pages/AddIngredientPage";
import RequestsPage from "./pages/RequestsPage";
import AuthErrorPage from "./pages/AuthErrorPage";
import PrivateRoute from "./components/PrivateRoute";

import {
  HOME_PAGE,
  RECIPE_SEARCH,
  ADD_RECIPE,
  MY_RECIPES,
  LOGIN,
  SIGNUP,
  RECIPE_PAGE,
  ADD_INGREDIENT,
  REQUESTS,
  EDIT_RECIPE,
  REQUEST_RECIPE,
  UNAUTH_USER,
} from "./constants/urlConstants";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const App = (
  <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <CentreColumn>
        {/* Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */}
        <Switch>
          <Route exact path={HOME_PAGE} component={HomePage} />
          <Route exact path={RECIPE_SEARCH} component={RecipeSearchPage} />
          <Route exact path={RECIPE_PAGE} component={Recipe} />
          <Route exact path={LOGIN} component={LoginPage} />
          <Route exact path={SIGNUP} component={SignUpPage} />
          <Route exact path={ADD_INGREDIENT} component={AddIngredientPage} />
          <Route exact path={UNAUTH_USER} component={AuthErrorPage} />

          <PrivateRoute exact path={ADD_RECIPE} component={AddRecipePage} />
          <PrivateRoute exact path={EDIT_RECIPE} component={AddRecipePage} />
          <PrivateRoute exact path={REQUEST_RECIPE} component={AddRecipePage} />
          <PrivateRoute exact path={MY_RECIPES} component={MyRecipesPage} />
          <PrivateRoute exact path={REQUESTS} component={RequestsPage} />

          <Route component={Notfound} />
        </Switch>
      </CentreColumn>
    </Router>
  </ThemeProvider>
);
ReactDOM.render(App, document.getElementById("root"));
