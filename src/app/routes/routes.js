import React, { Suspense, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Redirect, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../context/context";

const homePage = React.lazy(() => import("../features/homepage/homepage"));
const giftPage = React.lazy(() => import("../features/gifts-page/giftspage"));
const giftDetails = React.lazy(() =>import("../features/gift-details/giftDetails"));
const adminDashboard = React.lazy(() =>import("./../features/admin-dashboard/dashboard"));
const userProfile = React.lazy(() =>import("./../features/user-profile/userProfile"));

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));
export default function Routes() {
  const authContext = useContext(Context);
  const classes = useStyles();
  return (
    <Suspense fallback={<CircularProgress className={classes.progress} />}>
      <Switch>
        <Route path="/" exact component={homePage}></Route>
        <Route path="/gifts" exact component={giftPage}></Route>
        <Route path="/searchresults" exact component={giftPage}></Route>
        <Route path="/details" exact component={giftDetails}></Route>
        <Route path="/profile" exact component={userProfile}></Route>
        {authContext.isLoggedIn && authContext.isAdmin && (
          <Route path="/dashboard" exact component={adminDashboard}></Route>
        )}
        <Redirect from="/" to="/" />
      </Switch>
    </Suspense>
  );
}
