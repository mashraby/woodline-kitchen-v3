import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SearchContext } from "../../context/search.context";
import { NavLink, useLocation } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import FastfoodIcon from "@mui/icons-material/Fastfood";
// import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { ChangeEvent } from "react";
import { IPayment } from "../../interfaces/payments.interfacess";
import { searchOrders, searchPayments } from "../../services/api.service";
import PaymentIcon from "@mui/icons-material/Payment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import styledC from "styled-components";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { IOrder } from "../../interfaces/orders.interfaces";

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

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

export default function MiniDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const { pathname } = useLocation();
  // useEffect(()=>{
  //   handleSearch()
  // },[])
  const [searchData, setSearchData] = React.useState({});

  const handlPaymenteSearch = (event: ChangeEvent<HTMLInputElement>) => {
    searchPayments(event.target.value)
      .then((payments: IPayment) => {
        setSearchData(payments);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  const handlOrdersSearch = (event: ChangeEvent<HTMLInputElement>) => {
    searchOrders(event.target.value)
      .then((order: IOrder) => {
        setSearchData(order);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  // console.log(searchData)
  //   console.log(searchValue)

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          background: "#425DCC",
          color: "#fff",
        }}
      >
        <Typography fontWeight={"bold"} variant="h6" noWrap component="div">
          Наша кухня
        </Typography>
        <RestaurantMenuIcon sx={{ fontSize: "32px", color: "#fff" }} />
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            className={pathname === "/" ? "Mui-selected" : ""}
            component={NavLink}
            to="/"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Дaшборд"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            className={pathname === "/roles" ? "Mui-selected" : ""}
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
            className={pathname === "/users" ? "Mui-selected" : ""}
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
            className={pathname === "/food-category" ? "Mui-selected" : ""}
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
            className={pathname === "/foods" ? "Mui-selected" : ""}
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
            className={pathname === "/lunchs" ? "Mui-selected" : ""}
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
            className={pathname === "/orders" ? "Mui-selected" : ""}
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
            className={pathname === "/payments" ? "Mui-selected" : ""}
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
            className={pathname === "/deedline" ? "Mui-selected" : ""}
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
            className={pathname === "/products" ? "Mui-selected" : ""}
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
            className={pathname === "/warehouse" ? "Mui-selected" : ""}
            component={NavLink}
            to="/warehouse"
          >
            <ListItemIcon>
              <SignalCellularAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Инвентаризация"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <FlexWrapper>
            <Search
              sx={{
                display:
                  pathname === "/" ||
                  pathname === "/roles" ||
                  pathname === "/food-category" ||
                  pathname === "/lunchs" ||
                  pathname === "/deedline"
                    ? "none"
                    : "",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (pathname === "/payments") {
                    console.log(1);
                    handlPaymenteSearch(e);
                    setSearchValue(e.target.value);
                  }
                  if (pathname === "/orders") {
                    console.log(4);
                    handlOrdersSearch(e);
                  }
                }}
                placeholder="Поиск…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </FlexWrapper>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
