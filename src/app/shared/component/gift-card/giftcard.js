import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        maxWidth: 500,
        marginRight: '35px'
    },
    cardMedia: {
        height: '220px',
        objectFit: 'fill'
    },
    cardtext: {
        display: 'inline-block',
        width: '14em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    btns: {
        margin: 'auto'
    }
});


const GiftCard = React.memo((props) => {
    const classes = useStyles();
    const routeTogiftDetails = useCallback(() => {
        props.history.push(`/details?giftId=${props.id}`);
    }, [props.history, props.id])
    const buttonHandler = useCallback(() => {
        routeTogiftDetails(props.id)
    }, [props.id, routeTogiftDetails])

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    alt="Gift Card"
                    height="140"
                    image={props.image}
                    title="Gift Card"
                />
                <CardContent>
                    <Typography className={classes.cardtext} gutterBottom variant="h5" component="h2">
                        {props.cardName}
                    </Typography>
                    <Typography className={classes.cardtext} variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={buttonHandler} className={classes.btns} size="small" color="primary">View Details</Button>
            </CardActions>
        </Card>
    );
});

export default withRouter(GiftCard);