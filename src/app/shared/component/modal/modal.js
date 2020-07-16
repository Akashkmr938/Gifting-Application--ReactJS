import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SendGift from './../../../features/send-gift/sendgift';
import { Context } from '../../../context/context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const modalContext = useContext(Context);

  const closeHandler = () => {
    modalContext.toggleModal();
  }

  const snackBarHandle = (msg) => {
    props.snackBarhandler(msg);
  }
  return (
    <div>
      <Dialog
        open={modalContext.modalState}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Send Gift"}</DialogTitle>
        <DialogContent>
          <SendGift snackBarHandle={snackBarHandle} />
        </DialogContent>
      </Dialog>
    </div>
  );
}