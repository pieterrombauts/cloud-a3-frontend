import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useLogout } from 'api/auth/actions';
import { clearAuthToken } from 'api/auth/tokens';
import { Paths } from 'Paths';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useLoginContext } from './UserContext';

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

const Logout: React.FC<LoginProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const queryClient = useQueryClient();
  queryClient.invalidateQueries('me');

  const { setLoggedIn } = useLoginContext();
  setLoggedIn(false);
  clearAuthToken();

  history.push(Paths.HOME);

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={0}>
        <p>Logging you out, please wait...</p>
      </Paper>
    </Container>
  );
};

export default Logout;
