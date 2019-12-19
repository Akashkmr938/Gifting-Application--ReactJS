import React, { useEffect, useState, useCallback } from 'react'
import GiftCard from '../../shared/component/giftCard/giftcard'
import { httpGet } from '../../shared/utils/http/http';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from '../../shared/component/carousel/carousel';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '70%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Homepage = React.memo(() => {
    const classes = useStyles();
    const [giftCards, setGiftCards] = useState([]);

    const fetchAllGiftCards = useCallback(async () => {
        const response = await httpGet('/giftCards?_start=0&_end=6');
        setGiftCards(response.data);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAllGiftCards();
    }, [fetchAllGiftCards]);

    return (
        <React.Fragment>
            <Carousel />
            <div className={classes.root}>
                <Grid container spacing={2}>
                    {giftCards.map(giftCard => {
                        return (
                            <Grid key={giftCard.id} item xs={4}>
                                <GiftCard cardName={giftCard.name} description={giftCard.desc} id={giftCard.id} image={giftCard.imageUrl} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </React.Fragment>
    )
});

export default Homepage;

