import React, { Fragment, useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LoginStyles from "./login.module.scss";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { httpGet } from "./../../../shared/utils/http/http";
import { Context } from "../../../context/context";

const Login = (props) => {
  const authContext = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (window.gapi) {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId:
              "245046245085-aqtiof6fnq42g2u1uooag9q9j028h9i4.apps.googleusercontent.com",
            scope: "email",
          })
          .then(() => {
            authContext.login(
              window.gapi.auth2.getAuthInstance().isSignedIn.get()
            );
            OAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(OAuthChange);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      const OAuthChange = (isSignedIn) => {
        if (isSignedIn) {
          authContext.login(true);
          const userData = window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile();

          authContext.setUserData({
            imageUrl: userData.getImageUrl(),
            userName: userData.getName(),
            email: userData.getEmail(),
          });

          httpGet("/users").then((response) => {
            response.data.forEach((user) => {
              if (user.email === userData.getEmail()) {
                if (user.isAdmin) {
                  authContext.admin(true);
                }
              }
            });
          });
        } else {
          authContext.admin(false);
          authContext.login(false);
          authContext.setUserData({
            imageUrl: "",
            userName: "",
            email: "",
          });
        }
      };
    }
    // eslint-disable-next-line
  }, []);

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    props.history.push("/");
  };

  const onSignInClick = () => {
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn({ prompt: "select_account" });
      handleClose();
    }
  };

  const handleClick = (event) => {
    event.persist();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeToProfilePage = () => {
    handleClose();
    props.history.push("/profile");
  };

  const routeToDashboard = () => {
    handleClose();
    props.history.push("/dashboard");
  };

  const renderAuthButton = () => {
    if (authContext.isLoggedIn === null) {
      return null;
    } else if (authContext.isLoggedIn) {
      return (
        <Fragment>
          <span>Welcome Back, {authContext.userData.userName}</span>
          <img
            src={authContext.userData.imageUrl}
            onClick={handleClick}
            className={LoginStyles.logoImg}
            alt="user-profile-pic"
          ></img>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {authContext.isAdmin ? (
              <MenuItem onClick={routeToDashboard}>Dashboard</MenuItem>
            ) : null}
            {!authContext.isAdmin ? (
              <MenuItem onClick={routeToProfilePage}>Profile</MenuItem>
            ) : null}
            <MenuItem onClick={onSignOutClick}>Logout</MenuItem>
          </Menu>
        </Fragment>
      );
    } else {
      return (
        <AccountCircle
          role="button"
          onClick={onSignInClick}
          className={LoginStyles.logoIcon}
        ></AccountCircle>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default withRouter(Login);
