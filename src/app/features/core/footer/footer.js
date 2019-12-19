import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mindtree.com">
        YoYoGift
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '15vh',
    color: 'white'
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#2E3B55',
    textAlign: "center"
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body2">YoYoGift PVT LTD.</Typography>
          <Copyright />
        </Container>
      </div>
    </footer>
  );
}