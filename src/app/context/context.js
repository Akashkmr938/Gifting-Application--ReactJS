import React, { createContext, useState } from "react";
import { checkPropTypes } from "prop-types";

export const Context = createContext({
  modalState: false,
  isLoggedIn: false,
  isAdmin: false,
  userData: {
    imageUrl: "",
    userName: "",
    email: "",
  },
  toggleModal: () => {},
  setAuthentication: () => {},
  setUserData: () => {},
});

const ContextProvider = (props) => {
  const [modalState, toggleModal] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [userData, setUserData] = useState({
    imageUrl: "",
    userName: "",
    email: "",
  });

  const toggleModalhandler = () => {
    toggleModal(!modalState);
  };
  const loginHandler = (value) => {
    setLoggedIn(value);
  };
  const adminHandler = (value) => {
    setAdmin(value);
  };
  const userDataHandler = (value) => {
    setUserData(value);
  };

  return (
    <Context.Provider
      value={{
        toggleModal: toggleModalhandler,
        modalState: modalState,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        login: loginHandler,
        admin: adminHandler,
        userData: userData,
        setUserData: userDataHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

Context.proptypes = {
  children: checkPropTypes.node,
};

export default ContextProvider;
