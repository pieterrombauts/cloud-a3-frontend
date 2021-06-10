import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link, useHistory } from 'react-router-dom'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
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
  newPassword: Yup.string()
    .min(8, 'Password must be more than 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
})

interface ResetPasswordForm {
  newPassword: string
  confirmPassword: string
}

const ResetPassword: React.FC<LoginProps> = (props) => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const history = useHistory()

  const initialValues: ResetPasswordForm = {
    newPassword: '',
    confirmPassword: '',
  }

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
          onSubmit={(values, { setSubmitting }) => {
            // login(values.email.trim().toLowerCase(), values.password)
            //   .then(() => {
            //     setError('')
            //     history.push('/')
            //   })
            //   .catch((error) => {
            //     if (error.response) {
            //       setError(error.response.data.message)
            //     }
            //   })
            //   .finally(() => setSubmitting(false))
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
                type="password"
                name="newPassword"
                label="Password"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                component={TextField}
              />
              <Field
                type="password"
                name="confirmPassword"
                label="Confirm Password"
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
                  'Reset Password'
                )}
              </Button>
              <Typography variant="subtitle1">
                Just Remembered? <Link to="/login">Log in</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

export default ResetPassword
