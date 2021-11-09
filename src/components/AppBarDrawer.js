import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SettingsIcon from "@mui/icons-material/Settings";

export default function AppBarDrawer({ open, onClick, children }) {
  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClick(state);
  };

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Link href="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link href="/examples">
              <ListItem button>
                <ListItemIcon>
                  <FlightTakeoffIcon />
                </ListItemIcon>
                <ListItemText primary="Examples" />
              </ListItem>
            </Link>
            <Link href="/config">
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Config" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>

      {children}
    </div>
  );
}
