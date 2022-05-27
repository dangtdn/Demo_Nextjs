import React, { useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { Button } from 'react-bootstrap';
import authServices from '../../../services/authServices';
import Link from 'next/link';
import { useRouter } from 'next/router';

function FormLogin() {
  const router = useRouter()
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if(isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  useEffect(() => {
    if (status === 500) setMsg("Email không chính xác");
    else if (status === 401) setMsg("Password không chính xác");
  }, [status]);

  const handleChange = (e: any): void => {
    const value = e.target.name;
    
    const newValue = {
      ...data,
      [e.target.name]: e.target.value
    }
    setData({...newValue}); 
  };

  const handleSubmit = async () => {
    console.log(data);
    // try {
    //   const res: any = await authServices.login(data);
    //   localStorage.setItem("accessToken", res.token);

    //   setIsLogin(true);
    // }catch(err: any) {
    //   setStatus(err.response.status);
    // }
  }

  return (
    <div className="login-wrapper">
        <h1 className="box-title text-center">Login</h1>
        <div className="form-login">
          <form onSubmit={handleSubmit}>
            <MDBInput
                name="email"
                label="Email *"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={handleChange}
              />
            <MDBInput
                name="password"
                label="Password *"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className='my-input'
                onChange={handleChange}
              />
            <div className="text-center">
              <Button color="primary" type="button">
                <span>Login</span>
              </Button>
            </div>
            <p className='text-center'><a href="">forgot passwaord</a></p>
            <p>Choose your language</p>
            <select className="browser-default custom-select">
              <option>Choose your option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </form>
        </div>
      </div>
  )
}

export default FormLogin