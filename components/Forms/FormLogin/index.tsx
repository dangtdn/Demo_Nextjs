import React, { useEffect, useState } from 'react'
import authServices from '../../../api/services/authServices';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { request } from '../../../api/Utils/axios-ultis';
import { useQuery } from 'react-query';
import axios from 'axios';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

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

  // const handleSubmit = async () => {
  //   console.log(dataInput);
    
  //   try {
  //     const response: any = await fetchLoginAPI(dataInput);
  //     console.log('auth: ',response.token);
      
  //     localStorage.setItem("accessToken", response.token);

  //     setIsLogin(true);
  //   }catch(err: any) {
  //     setStatus(err.response.status);
  //   }
  // }
  const validationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
  })
  .required();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data)
    
      try {
        const response: any = await fetchLoginAPI(data);
        console.log('auth: ',response.token);
        
        localStorage.setItem("accessToken", response.token);
  
        setIsLogin(true);
      }catch(err: any) {
        setStatus(err.response.status);
      }
  });


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
          <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState
          }) => (
            <FormControl fullWidth>
              <TextField
                id="standard-basic"
                label="Email *"
                variant="standard"
                fullWidth
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                error={invalid}
                helperText={error?.message}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState
          }) => (
            <FormControl fullWidth>
            <TextField
              id="standard-basic"
              label="Password *"
              variant="standard"
              fullWidth
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={invalid}
              helperText={error?.message}
            />
            </FormControl>
          )}
        />
              <Button 
              type='submit'
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