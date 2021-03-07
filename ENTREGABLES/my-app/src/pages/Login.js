import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { LoginForm } from "../components/main/LoginMain/LoginForm/LoginForm";
import { AuthContext } from "../components/providers/AuthProvider";
export const Login = () => {
  const [token, setToken] = useContext(AuthContext);
  const doSuccess = (responseBody) => setToken(responseBody.accessToken);
  const doError = (error) => console.error(error);
  console.log(token);

  const loginReturn = token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div>
        <LoginForm
          url="http://localhost:3080/api/v1/users/login/"
          onSuccess={doSuccess}
          onError={doError}
        ></LoginForm>
      </div>
    </>
  );
  return loginReturn;
};
