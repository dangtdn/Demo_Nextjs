import React, { useEffect, useState } from 'react'
import authServices from '../../../api/services/authServices';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { request } from '../../../api/Utils/axios-ultis';
import { useQuery } from 'react-query';
import axios from 'axios';

function FormLogin() {
  const router = useRouter()
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [dataInput, setDataInput] = useState({});
  const [language, setLanguage] = React.useState('English');

  useEffect(() => {
    if(isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  useEffect(() => {
    if (status === 500) setMsg("Email không chính xác");
    else if (status === 401) setMsg("Password không chính xác");
  }, [status]);

  const handleChangeSelect = (e: SelectChangeEvent): void => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: any): void => {
    setDataInput({...dataInput, [e.target.name]: e.target.value}); 
  };

  const fetchLoginAPI = (values: Object) => {
    // const rs =  await authServices.login(values);
    // return rs;
    return axios
    .post("https://dev-api.hexabase.com/api/v0/login", values)
    .then((res: any) => res.data);
  }

  // const { isLoading, data: accessToken, isError, error, isFetching } = useQuery("hexa-login", fetchLoginAPI);

  const handleSubmit = async () => {
    console.log(dataInput);
    
    try {
      const response: any = await fetchLoginAPI(dataInput);
      console.log('auth: ',response.token);
      
      localStorage.setItem("accessToken", response.token);

      setIsLogin(true);
    }catch(err: any) {
      setStatus(err.response.status);
    }
  }

  // if (isLoading || isFetching) {
  //   return <h2>Loading...</h2>
  // }else {
  //   // localStorage.setItem("accessToken", accessToken.token);
  //   console.log(accessToken);
  //   // router.push('/');
  // }

  // if (isError) {
  //   return <h2>{error.message}</h2>
  // }

  return (
    <div className="login-wrapper">
        <h1 className="box-title">Login</h1>
        <div className="form-login">
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
              id="email"
              name="email"
              label="Email *"
              type="text"
              variant="standard"
              fullWidth
              onChange={handleChange}
            />
            </FormControl>
            <FormControl fullWidth>
                <TextField
              id="password"
              name="password"
              label="Password *"
              type="text"
              variant="standard"
              fullWidth
              onChange={handleChange}
            />
            </FormControl>
              <Button 
              fullWidth 
              variant='contained' 
              sx={{marginTop: 3}}
              onClick={() => handleSubmit()}
              >
                <span>Login</span>
              </Button>
            <p className='link-forgot'><Link href='#'>forgot passwaord</Link></p>
            <p style={{marginBottom: '0'}}>Choose your language</p>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150, ml: 0 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={language}
                onChange={handleChangeSelect}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value='en'>English</MenuItem>
                <MenuItem value='jp'>Japanses</MenuItem>
              </Select>
            </FormControl>
          </form>
        </div>
      </div>
  )
}

export default FormLogin