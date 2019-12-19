import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import HeaderStyles from './header.module.scss';
import Logo from './../../../../assets/images/logo.png';
import { httpGet } from './../../../shared/utils/http/http';
import Paper from '@material-ui/core/Paper';
import SearchBox from '../../../shared/component/search/search';
import Button from '@material-ui/core/Button';
import Login from '../login/login';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logoIcon: {
        fontSize: 2.2 + 'rem'
    },
    Appbar: {
        backgroundColor: '#2E3B55',
        position: 'fixed',
        top: 0
    },
    paper: {
        textAlignLast: 'center'
    }
}));

const Header = React.memo((props) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([])

    const fetchAllCategories = useCallback(async () => {
        const response = await httpGet('/categories');
        setCategories(response.data);
    }, []);

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);

    const routeToHomePage = () => {
        props.history.push('/');
    };

    const routetoDetailsPage = (categoryID) => {
        props.history.push('/gifts?category=' + categoryID);
    }

    return (
        <React.Fragment>
            <header className={classes.root}>
                <AppBar position="sticky" className={classes.Appbar}>
                    <Toolbar>
                        <img src={Logo} alt='logo icon' onClick={routeToHomePage} className={HeaderStyles.logo} />
                        <IconButton onClick={routeToHomePage} role="menu" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            YoYoGift
                    </IconButton>
                        <SearchBox />
                        <div variant="h6" className={classes.title}></div>
                        <Login />
                    </Toolbar>
                </AppBar>
            </header>
            <div className={HeaderStyles.tabWrapper}>
                <Paper className={classes.paper}>
                    {categories.map(category => <Button
                        key={category.id}
                        onClick={() => routetoDetailsPage(category.id)}>{category.name}
                    </Button>)}
                </Paper>
            </div>
        </React.Fragment>
    );
});

export default withRouter(Header);
