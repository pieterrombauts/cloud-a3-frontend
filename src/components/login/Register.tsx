import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { CircularProgress, emphasize, makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { login, register } from 'api/auth/actions';
import { TextField } from 'formik-material-ui';
import { Alert } from '@material-ui/lab';
import { Paths } from 'Paths';
import { useLoginContext } from './UserContext';

interface RegisterProps {}

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
  },
});

const registerSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('Required'),
  lastName: Yup.string().min(2, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
});

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState('');
  const { loggedIn, setLoggedIn } = useLoginContext();

  const initialValues: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  if (loggedIn) {
    history.push(Paths.HOME);
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={0}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('I got called');
            try {
              const email = values.email.trim().toLocaleLowerCase();
              await register({
                ...values,
                email: email,
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
              });
              await login(email, values.password);
              setError('');
              setLoggedIn(true);
              history.push(Paths.HOME);
            } catch (error) {
              setError(error.response.data.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form} noValidate>
              {error && (
                <Alert severity="error" style={{ width: '100%' }}>
                  {error}
                </Alert>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    component={TextField}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    component={TextField}
                  />
                </Grid>
              </Grid>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                component={TextField}
              />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                component={TextField}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Sign up'}
              </Button>
              <Typography variant="subtitle1">
                <Link to="/login">Already have an account? Sign in</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;
