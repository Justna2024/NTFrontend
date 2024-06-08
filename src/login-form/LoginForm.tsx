import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import * as yup from 'yup';
import BookList from '../books/BookList';
import { useNavigate } from 'react-router-dom';

import { useApi } from '../api/ApiProvider';
import {JwtPayload, jwtDecode} from 'jwt-decode';

interface Token {
  token: string;
}
interface DecodedToken {
  sub: string;
  role: string;
  userId: bigint;
}
function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const [userId, setUserId] = useState<bigint | null>(null);
  const [useRole, setUserRole] = useState<string | null>(null);
  


  // const [isSignedIn, setIsSignedIn] = useState(false);  used before using routes, not important anymore


  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      
      apiClient.login(values).then((response) => {
        if (response && response.success && response.data && response.data.token) {
          
          console.log(response.data.token)

        //using jwt-decode and returing it as our interface DecodedToken
        const decoded = jwtDecode<DecodedToken>(response.data.token.toString());
        
        //setting user data to variables we can use later
        setUserId(decoded.userId);
        setUserRole(decoded.role);

        

          navigate('/Home');
        } else{
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
      console.log('request send');


      //showing it works
      console.log(userId)
      console.log(useRole)
      
      //
      console.log(values);
      //setIsSignedIn(true);
    },
    [apiClient, navigate],
  );

  // we create some scheme
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(3, 'Must be 3 characters or more'),
      }),
    [],
  );
  // if (isSignedIn) {
  //   return <BookList />;
  // }
  return (
    <div>
      <nav className="navBarStyle">
        <h4>Library System {userId?.toString()} </h4>
        <a href="/">Register </a>
      </nav>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(Formik: any) => (
          <form
            className="Login-form"
            id="singForm"
            onSubmit={Formik.handleSubmit}
            noValidate
          >
            <TextField
              id="username"
              label="username"
              variant="standard"
              name="username"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.username && !!Formik.errors.username}
              helperText={Formik.touched.username && Formik.errors.username}
            />

            <TextField
              id="password"
              label="password"
              variant="standard"
              type="password"
              name="password"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.password && !!Formik.errors.password}
              helperText={Formik.touched.password && Formik.errors.password}
            />

            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              form="singForm"
              disabled={!(Formik.isValid && Formik.dirty)}
            >
              Sign In
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
export default LoginForm;
