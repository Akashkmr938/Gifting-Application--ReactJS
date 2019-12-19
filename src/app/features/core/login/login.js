import React, { useState, useEffect, useContext } from 'react'
import { GoogleLogin } from 'react-google-login';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginStyles from './login.module.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { httpGet } from '../../../shared/utils/http/http';
import { AuthContext } from '../../../context/auth-context';

export default function Login() {

    const authContext = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ imageUrl: '', name: '', email: '', isAdmin: false });
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
            setUserData({
                imageUrl: localStorage.getItem('userImage'),
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                isAdmin: localStorage.getItem('isAdmin'),
            })
            authContext.setAuth({
                isLoggedIn: true,
                isAdmin: userData.isAdmin
            })
        }
    }, []);

    const responseGoogle = (response) => {
        setIsLoggedIn(true);
        setUserData(response.profileObj);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userImage', response.profileObj.imageUrl);
        localStorage.setItem('userName', response.profileObj.name);
        localStorage.setItem('email', response.profileObj.email);
        httpGet('/users').then((responseData) => {
            responseData.data.forEach(user => {
                if (user.email === response.profileObj.email) {
                    if (user.isAdmin)
                        localStorage.setItem('isAdmin', true);
                    else
                        localStorage.setItem('isAdmin', false);
                }
            })
        });
    }

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('userImage');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('isAdmin');
        authContext.setAuth({
            isLoggedIn: false,
            isAdmin: false
        })
        
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        isLoggedIn ?
            <>
                <img src={userData.imageUrl} onClick={handleClick} className={LoginStyles.logoImg} alt="user-profile-pic"></img>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem onClick={() => { }}>Profile</MenuItem>
                    <MenuItem onClick={() => { }}>Top-up</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </>
            :
            <GoogleLogin
                clientId="245046245085-aqtiof6fnq42g2u1uooag9q9j028h9i4.apps.googleusercontent.com"
                render={renderProps => (
                    <AccountCircle role="button" onClick={renderProps.onClick} disabled={renderProps.disabled} className={LoginStyles.logoIcon} ></AccountCircle>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
    )
}
