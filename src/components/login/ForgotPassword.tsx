import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link, useHistory } from 'react-router-dom'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { useQuery } from 'react-query'
import { forgotPassword, login } from 'api/auth/actions'
import { Alert } from '@material-ui/lab'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createFalse } from 'typescript'
import { TextField } from 'formik-material-ui'

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
})

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

interface ForgotPasswordForm {
  email: string
}

const Login: React.FC<LoginProps> = (props) => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const history = useHistory()

  const initialValues: ForgotPasswordForm = { email: '' }
  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={0}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await forgotPassword(values.email.trim().toLowerCase())
              setError('')
            } catch (error) {
              if (error.response) {
                setError(error.response.data.message)
              }
            } finally {
              setSubmitting(false)
            }
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
              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  'Send recovery email'
                )}
              </Button>
              <Typography variant="subtitle1">
                I remember now! <Link to="/login">Log in</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

export default Login
