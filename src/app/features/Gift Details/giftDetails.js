import React, { useEffect, useState, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { httpGet } from '../../shared/utils/http/http';
import Modal from '../../shared/component/modal/modal';
import { AuthContext } from '../../context/auth-context';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const GiftDetails = React.memo((props) => {
    const modalContext = useContext(AuthContext);
    const classes = useStyles();
    const [giftDetails, setGiftDetails] = useState([]);

    const getchGiftDetails = useCallback(async (params) => {
        const response = await httpGet(`/giftCards?id=${params}`);
        setGiftDetails(response.data);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        const query = new URLSearchParams(props.location.search);
        let params = null;
        for (let param of query.entries()) {
            params = param[1];
        }
        getchGiftDetails(params);
    }, [props.location.search, getchGiftDetails]);

    const openGiftingModal = () => {
        modalContext.toggleModal();
    }

    const calcOriginalPrice = () => {
        return Math.round(((giftDetails[0].buyoutPoints * 100) / giftDetails[0].discount));
    }

    return (
        <>
            {giftDetails.length ? (
                <>
                    <div>
                        <h1>{giftDetails[0].name}</h1>
                    </div>
                    <div>
                        <img src={giftDetails[0].imageUrl} alt="gift"></img>
                    </div>
                    <div className={classes.root}>
                        <Button variant="contained" color="primary" onClick={openGiftingModal}>Send Gift</Button>
                        {modalContext.modalState ? <Modal /> : null}
                    </div>
                    <div>
                        <h2>Details</h2>
                        <h3>Price:
                            <strike>{calcOriginalPrice()}</strike>
                            &nbsp; {giftDetails[0].buyoutPoints}</h3>
                        <h3>Brand: {giftDetails[0].brand}</h3>
                        <h3>Expired After: {giftDetails[0].expiryDays} Days</h3>
                    </div>
                    <div>
                        Description:
                        <p>{giftDetails[0].desc}</p>
                    </div>
                </>) : null}
        </>
    )
});

export default GiftDetails;
