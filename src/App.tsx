import React, { useState } from 'react'
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
import { Paths } from 'Paths'
import Logout from 'components/login/Logout'
import { LoginContext, LoginProvider } from 'components/login/UserContext'
import { isLoggedIn } from 'api/auth/tokens'

const useStyles = makeStyles({
  app: {},
})

const queryClient = new QueryClient()

function App() {
  const classes = useStyles()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <QueryClientProvider client={queryClient}>
        <div className={classes.app}>
          <CssBaseline />
          <Router>
            <NavBar />
            <Route path={Paths.WEATHER}>
              <SpaceWeatherDash />
            </Route>
            <Route path={Paths.SATELLITES}>
              <SatelliteDash />
            </Route>
            <Route path={Paths.REGISTER}>
              <Register />
            </Route>
            <Route path={Paths.PROFILE}>
              <Profile />
            </Route>
            <Route path={Paths.LOGIN}>
              <Login />
            </Route>
            <Route path={Paths.LOGOUT}>
              <Logout />
            </Route>
            <Route path={Paths.FORGOT_PASSWORD}>
              <ForgotPassword />
            </Route>
            <Route path={Paths.RESET_PASSWORD}>
              <ResetPassword />
            </Route>
            <Route path={Paths.HOME}></Route>
          </Router>
        </div>
      </QueryClientProvider>
    </LoginContext.Provider>
  )
}

export default App
