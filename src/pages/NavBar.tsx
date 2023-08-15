import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h5" style={{ fontWeight: 800, flexGrow: 1 }}>
          Company Financial Reports
        </Typography>
        <Button color="inherit" component={Link} to="/companies">
          Back to Companies
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
