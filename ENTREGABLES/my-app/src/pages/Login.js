import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../components/main/LoginMain/LoginForm/LoginForm";
import { AuthContext } from "../components/providers/AuthProvider";

export const Login = () => {
  const [token] = useContext(AuthContext);

  const loginReturn = token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div>
        <LoginForm url="http://localhost:3080/api/v1/users/login/"></LoginForm>
      </div>
    </>
  );
  return loginReturn;
};
