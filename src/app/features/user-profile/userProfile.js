import React, { useContext, useEffect, useCallback, useState } from "react";
import { Context } from "../../context/context";
import profileStyles from "./userProfile.module.scss";
import { httpGet } from "../../shared/utils/http/http";

function UserProfile() {
  const context = useContext(Context);
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = useCallback(async () => {
    const response = await httpGet(`/users?email=${context.userData.email}`);
    setUserInfo(response.data[0]);
  }, [context.userData.email]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserInfo();
  }, [fetchUserInfo]);
  return (
    <div>
      <img
        className={profileStyles.img}
        src={context.userData.imageUrl}
        alt="user profile"
      />
      <h2>Name: {context.userData.userName}</h2>
      <h2>E-mail: {context.userData.email}</h2>
      <h2>Wallet Balance: {userInfo.balancePoints}</h2>
    </div>
  );
}

export default UserProfile;
