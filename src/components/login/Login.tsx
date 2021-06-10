import React, { useContext, useEffect, useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useQuery } from 'react-query';
import { login } from 'api/auth/actions';
import { Alert } from '@material-ui/lab';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createFalse } from 'typescript';
import { TextField } from 'formik-material-ui';
import { Paths } from 'Paths';
import { LoginContext, useLoginContext } from './UserContext';

interface LoginProps {}

const useStyles = makeStyles({
  paper: {
    marginTop: '30px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  avatar: {
    backgroundColor: '#DC004E',
    margin: '10px',
  },
  form: {
    width: '100%',
    marginTop: '10px',
  },
  submit: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: 10,
  },
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});
interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = (props) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useLoginContext();

  if (loggedIn) {
    history.push(Paths.HOME);
  }

  const initialValues: LoginForm = { email: '', password: '' };
  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={0}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            login(values.email.trim().toLowerCase(), values.password)
              .then(() => {
                setError('');
                setLoggedIn(true);
                history.push(Paths.HOME);
              })
              .catch((error) => {
                if (error.response) {
                  setError(error.response.data.message);
                }
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              {error && (
                <Alert severity="error" style={{ width: '100%' }}>
                  {error}
                </Alert>
              )}
              <Field
                type="email"
                name="email"
                label="Email"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                component={TextField}
              />
              <Field
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                component={TextField}
              />

              <Typography variant="subtitle1">
                <Link to="/forgot-password">Forgot password</Link>
              </Typography>
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'login'}
              </Button>
              <Typography variant="subtitle1">
                <Link to={Paths.REGISTER}>Don't have an account? Sign up</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
