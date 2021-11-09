import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import AppBarDrawer from "./AppBarDrawer";

export default function MenuAppBar({ children }) {
  const [drawer, togglerDrawer] = React.useState();

  const toggleMenu = () => {
    togglerDrawer((currentState) => !currentState);
  };

  const handleClose = () => {
    togglerDrawer(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ paddingTop: 48 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Scanner
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBarDrawer open={drawer} onClick={handleClose}>
        {children}
      </AppBarDrawer>
    </Box>
  );
}
