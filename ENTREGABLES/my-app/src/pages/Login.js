import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../components/main/LoginMain/LoginForm/LoginForm";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserContext } from "../components/providers/UserProvider";

export const Login = () => {
  const [selectedUser, setSelectedUser] = useContext(UserContext);
  const [token, setToken] = useContext(AuthContext);

  const doSuccess = (responseBody) => setToken(responseBody.accessToken);
  const doError = (error) => console.error(error);
  const doSuccessUser = (responseBody) => setSelectedUser(responseBody.user);

  const loginReturn = token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div>
        <LoginForm
          url="http://localhost:3080/api/v1/users/login/"
          onSuccess={doSuccess}
          onError={doError}
          onSuccessUser={doSuccessUser}
        ></LoginForm>
      </div>
    </>
  );
  return loginReturn;
};
