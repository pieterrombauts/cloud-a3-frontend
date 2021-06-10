import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { me } from 'api/auth/queries';
import { User } from 'api/auth/queries';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

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

const Profile: React.FC<LoginProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { data, error, isLoading } = useQuery<User>('me', me);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data || error) {
    return <div>An error occurred</div>;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Paper>
            <Box padding={2}>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <Typography variant="h4">
                {data.firstName} {data.lastName}
              </Typography>
              <Typography variant="h6">{data.email}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box padding={2}>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <Typography variant="h4">
                {data.firstName} {data.lastName}
              </Typography>
              <Typography variant="h6">{data.email}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
