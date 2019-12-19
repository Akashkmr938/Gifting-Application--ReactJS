import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SendGift from './../../../features/send-gift/sendgift';
import { AuthContext } from '../../../context/auth-context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const modalContext = useContext(AuthContext);
  console.log(modalContext);
  

  const closeHandler = () => {
    modalContext.toggleModal();
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
          <SendGift />
        </DialogContent>
      </Dialog>
    </div>
  );
}