import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import { IPerson } from "../../../interfaces/users.interfaces";
import { getUserAnalytics } from "../../../services/analytics.service";
import accounting from "accounting";
import ChildModal from "./child-modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "space-around",
};

interface AnalyticModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  date: number;
}

interface userInt {
  user: IPerson | null;
  profit: number;
}

export const AnalyticModal: React.FC<AnalyticModalProps> = (props) => {
  const { setOpen, open, id, date } = props;
  const handleClose = () => setOpen(false);
  const [anUser, setAnUser] = useState<userInt>({
    user: null,
    profit: 0,
  });

  const [childOpen, setChildOpen] = useState<boolean>(false);

  useEffect(() => {
    getUserAnalytics(id, date).then((data) => setAnUser(data));
  }, [id]);
  console.log(anUser);

  return (
    <>
      <ChildModal open={childOpen} setOpen={setChildOpen} />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box>
              <Typography variant="h5" style={{ display: "flex", gap: "10px" }}>
                <Box fontWeight={"bold"}>Имя:</Box> {anUser?.user?.fullname}
              </Typography>
              <Typography variant="h5" style={{ display: "flex", gap: "10px" }}>
                <Box fontWeight={"bold"}>summa:</Box>{" "}
                {accounting.formatNumber(anUser?.profit, 0, " ")} so'm
              </Typography>
              <Typography variant="h5" style={{ display: "flex", gap: "10px" }}>
                <Box fontWeight={"bold"}>now summa:</Box>{" "}
                {accounting.formatNumber(anUser?.user?.balance ?? 0, 0, " ")}{" "}
                so'm
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={"bold"}>
                История покупки:
                <TableContainer component={Paper}>
                  <Table
                    size="small"
                    sx={{ minWidth: 500 }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">date</TableCell>
                        <TableCell align="left">summa</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        onClick={() => setChildOpen(true)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                      >
                        <TableCell align="left">22 - april</TableCell>
                        <TableCell align="left">12 000 so'm</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};
