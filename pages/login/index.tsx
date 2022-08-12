import { NextPage } from "next";
import React from "react";
import FormLogin from "../../components/Forms/FormLogin";

const Login: NextPage = () => {
  return (
    <div className="content-wrapper">
      <FormLogin />
    </div>
  );
};

export default Login;
