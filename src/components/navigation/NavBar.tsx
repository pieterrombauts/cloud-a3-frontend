import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import React from 'react';


interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Space Information Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;