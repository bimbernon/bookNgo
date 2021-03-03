import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginForm } from "../components/main/LoginMain/LoginForm/LoginForm";

export const Login = () => {
  return (
    <Router>
      <div>
        <LoginForm></LoginForm>
      </div>
    </Router>
  );
};
