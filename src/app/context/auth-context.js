import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    modalState: false,
    isLoggedIn: false,
    isAdmin: false,
    toggleModal: () => { },
    setAuthentication: () => { }
});

const AuthContextProvider = props => {
    const [modalState, toggleModal] = useState(false);
    const [auth, setAuth] = useState({ isLoggedIn: false, isAdmin: false });

    const toggleModalhandler = () => {
        toggleModal(!modalState);
    }
    const authenticationHandler = (authPayload) => {
        setAuth(authPayload);
    }

    return (
        <AuthContext.Provider
            value={{
                toggleModal: toggleModalhandler,
                modalState: modalState,
                auth: auth,
                setAuth: authenticationHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

