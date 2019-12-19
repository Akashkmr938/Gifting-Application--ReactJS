import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const homePage = React.lazy(() => import('../features/homepage/homepage'));
const giftPage = React.lazy(() => import('../features/Gifts Page/giftspage'));
const giftDetails = React.lazy(() => import('../features/Gift Details/giftDetails'));
const adminDashboard = React.lazy(() => import('./../features/admin-dashboard/dashboard'));

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2)
    },
}));
export default function Routes() {
    const classes = useStyles();
    return (
        <Suspense fallback={<CircularProgress className={classes.progress} />}>
            <Route path="/" exact component={homePage}></Route>
            <Route path="/gifts" exact component={giftPage}></Route>
            <Route path="/searchresults" exact component={giftPage}></Route>
            <Route path="/details" exact component={giftDetails}></Route>
            <Route path="/admin" exact component={adminDashboard}></Route>
        </Suspense>
    )
}
