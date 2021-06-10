import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from 'components/navigation/NavBar'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import SpaceWeatherDash from 'components/spaceweather/SpaceWeatherDash'
import { makeStyles } from '@material-ui/styles'
import Login from 'components/login/Login'
import Register from 'components/login/Register'
import Profile from './pages/Profile'
import SatelliteDash from 'components/satellites/SatelliteDash'
import { QueryClient, QueryClientProvider } from 'react-query'
import ForgotPassword from 'components/login/ForgotPassword'
import ResetPassword from 'components/login/ResetPassword'

const useStyles = makeStyles({
  app: {},
})

const queryClient = new QueryClient()

function App() {
  const classes = useStyles()
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.app}>
        <CssBaseline />
        <Router>
          <NavBar />
          <Route path="/weather">
            <SpaceWeatherDash />
          </Route>
          <Route path="/satellites">
            <SatelliteDash />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/"></Route>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App
