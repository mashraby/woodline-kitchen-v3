import { useContext, useState } from "react";
import {
  IPerson,
  IRow,
  UsersTableProps,
} from "../../../interfaces/users.interfaces";
import { BasicModal } from "../change-balance-modal/change-balance-modal";
import { BasicModalUser } from "../change-user-modal/change-user-modal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  SwitchProps,
} from "@mui/material";
import accounting from "accounting";
import { updateUserStatus } from "../../../services/api";
import { ReloadContext } from "../../../context/reload.context";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const UsersTable: React.FC<UsersTableProps> = (props) => {
  const rows: IRow[] = [];
  const users: IPerson[] = props.users as any;
  const [open, setOpen] = useState<boolean>(false);
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [userRole, setUserRole] = useState<string>("");

  const { reload, setReload } = useContext(ReloadContext);

  users &&
    users.forEach((e, i) => {
      rows.push({
        id: i + 1,
        user_id: e._id,
        fullname: e.fullname,
        phone_number: e.phone_number,
        telegram_id: e.telegram_id,
        balance: e.balance,
      });
    });

  const handleRowClick = (user: IPerson): void => {
    setOpen(true);
    setText(user.fullname);
    setUserId(user._id);
    setBalance(user.balance);
  };

  const handleChangeUser = (user: IPerson): void => {
    setOpenUser(true);
    setUserRole(user.role._id);
    setText(user.fullname);
    setUserId(user._id);
    setBalance(user.balance);
  };

  const myChangeFn = (user: IPerson) => {
    setReload(!reload);
    updateUserStatus(user._id, !user.is_verified).then((res) => {
      console.log(res);
    });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptions = (user: IPerson) => {};

  return (
    <>
      <BasicModal
        open={open}
        setOpen={setOpen}
        text={text}
        userId={userId}
        balance={balance}
        setBalance={setBalance}
      />
      <BasicModalUser
        openUser={openUser}
        setOpenUser={setOpenUser}
        userRole={userRole}
        text={text}
        userId={userId}
        balance={balance}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Telegram ID</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Change Status</StyledTableCell>
              <StyledTableCell>Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{user.fullname}</StyledTableCell>
                <StyledTableCell>{user.telegram_id}</StyledTableCell>
                <StyledTableCell>{user.phone_number}</StyledTableCell>
                <StyledTableCell>
                  {accounting.formatNumber(user.balance, 0, " ") + " so'm"}
                </StyledTableCell>
                <StyledTableCell>
                  {user.role === null ? "No role" : user.role.title}
                </StyledTableCell>
                <StyledTableCell>
                  <FormControlLabel
                    onChange={() => myChangeFn(user)}
                    control={
                      <IOSSwitch
                        checked={user.is_verified}
                        sx={{ m: 1 }}
                        defaultChecked={user.is_verified ? true : false}
                      />
                    }
                    label={user.is_verified ? "verify" : "not verify"}
                  />
                </StyledTableCell>

               
                <StyledTableCell>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      // onChange={() => handleOptions(user)}
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleRowClick(user)}>
                        Добавить баланс
                      </MenuItem>
                      <MenuItem onClick={() => handleChangeUser(user)}>
                        Изменить Роли
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Изменить Имя</MenuItem>
                    </Menu>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
