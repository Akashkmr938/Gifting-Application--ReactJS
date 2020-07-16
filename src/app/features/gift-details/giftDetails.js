import React, { useEffect, useState, useCallback, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { httpGet } from "../../shared/utils/http/http";
import Modal from "../../shared/component/modal/modal";
import { Context } from "../../context/context";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  description: {
    width: "70%"
  }
}));

const GiftDetails = React.memo(props => {
  const [snackBarState, setSnackBarState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: ""
  });

  const { vertical, horizontal, open, message } = snackBarState;

  const openSnackBar = msg => {
    setSnackBarState({ ...snackBarState, open: true, message: msg });
  };

  const closeSnackBar = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };
  const context = useContext(Context);
  const classes = useStyles();
  const [giftDetails, setGiftDetails] = useState([]);

  const getchGiftDetails = useCallback(async params => {
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
    if (context.isLoggedIn) {
      context.toggleModal();
    } else {
      openSnackBar("Login to continue !!!");
    }
  };

  const calcOriginalPrice = () => {
    return Math.round(
      giftDetails[0].buyoutPoints / ((100 - giftDetails[0].discount) / 100)
    );
  };

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
            <Button
              variant="contained"
              color="primary"
              onClick={openGiftingModal}
            >
              Send Gift
            </Button>
            {context.modalState ? (
              <Modal snackBarhandler={openSnackBar} />
            ) : null}
          </div>
          <div>
            <h2>Details</h2>
            <h3>
              Price:
              <strike>{calcOriginalPrice()}</strike>
              &nbsp; {giftDetails[0].buyoutPoints} ({giftDetails[0].discount}%
              off)
            </h3>
            <h3>Brand: {giftDetails[0].brand}</h3>
            {giftDetails[0].expiryDays ? (
              <h3>Expired After: {giftDetails[0].expiryDays} Days</h3>
            ) : null}
          </div>
          <div>
            <h3> Description:</h3>
            <p className={classes.description}>{giftDetails[0].desc}</p>
          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open}
            onClose={closeSnackBar}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={message}
          />
        </>
      ) : null}
    </>
  );
});

export default GiftDetails;
