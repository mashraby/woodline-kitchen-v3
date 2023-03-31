import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import styledC from "styled-components";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PeopleIcon from "@mui/icons-material/People";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PaymentIcon from "@mui/icons-material/Payment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const FlexWrapper = styledC.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Search = muiStyled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = muiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const MiniDrawer: React.FC = () => {
  const theme = useTheme();
  const myOpen = JSON.parse(localStorage.getItem("open") as any);
  const [open, setOpen] = useState(myOpen);
  const href: string = window.location.href
    .toString()
    .split("https://woodline-kitchen-v2.vercel.app")[1];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("open", JSON.stringify(open));
  }, [open]);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <FlexWrapper>
            <Typography variant="h6" noWrap component="div">
              Наша кухня
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Поиск…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </FlexWrapper>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/roles" ? "Mui-selected" : ""}
              component={NavLink}
              to="/roles"
            >
              <ListItemIcon>
                <KeyboardCommandKeyIcon />
              </ListItemIcon>
              <ListItemText primary={"Роли"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/users" ? "Mui-selected" : ""}
              component={NavLink}
              to="/users"
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Пользователи"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/food-category" ? "Mui-selected" : ""}
              component={NavLink}
              to="/food-category"
            >
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText primary={"Категория еды"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/foods" ? "Mui-selected" : ""}
              component={NavLink}
              to="/foods"
            >
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={"Еда"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/lunchs" ? "Mui-selected" : ""}
              component={NavLink}
              to="/lunchs"
            >
              <ListItemIcon>
                <RamenDiningIcon />
              </ListItemIcon>
              <ListItemText primary={"Обеды"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/orders" ? "Mui-selected" : ""}
              component={NavLink}
              to="/orders"
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Заказы"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/payments" ? "Mui-selected" : ""}
              component={NavLink}
              to="/payments"
            >
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary={"Платежи"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              className={href === "/deedline" ? "Mui-selected" : ""}
              component={NavLink}
              to="/deedline"
            >
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary={"Срок действия"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={href === "/products" ? "Mui-selected" : ""}
              component={NavLink}
              to="/products"
            >
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"Продукты"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              className={href === "/warehouse" ? "Mui-selected" : ""}
              component={NavLink}
              to="/warehouse"
            >
              <ListItemIcon>
                <SignalCellularAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Инвентаризация"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              className={href === "/stats" ? "Mui-selected" : ""}
              component={NavLink}
              to="/stats"
            >
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary={"Аналитика"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
