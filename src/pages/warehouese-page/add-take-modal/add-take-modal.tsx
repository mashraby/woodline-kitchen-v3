import { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { IAddTakeModalProps } from "../../../interfaces/warehouse.interface";
import { postWarehouseTake } from "../../../services/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ReloadContext } from "../../../context/reload.context";

// type SelectChangeEvent<T = string> = (Event & {
//   target: {
//       value: T;
//       // name: string;
//   };
// })

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddTakeModal: React.FC<IAddTakeModalProps> = (props) => {
  const { takeOpen, setTakeOpen, productId } = props;
  const handleClose = () => setTakeOpen(false);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("true");
  const { reload, setReload } = useContext(ReloadContext);

  const createTakeWarehouse = () => {
    if (amount === 0) {
      toast.warning("Input bo'sh bo'lmasligi kerak");
    } else {
      postWarehouseTake(productId, amount, type === "true" ? true : false)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success(
              type === "true" ? "Successfully created" : "Successfully removed"
            );
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Qoshilmadi qayta urinib koring");
          }
        })
        .finally(() => {
          setTakeOpen(false);
          setReload(!reload);
          setAmount(0);
          setType("true");
        });
    }
  };

  const handleChange = (evt: SelectChangeEvent) => {
    setType(evt.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={takeOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={takeOpen}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Add Take
            </Typography>

            <TextField
              onChange={(evt) => setAmount(+evt.target.value)}
              sx={{ my: 3 }}
              type="number"
              variant="outlined"
              label="amount"
              fullWidth
            />

            <FormControl sx={{ mb: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Add or remove
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Add or remove"
                onChange={handleChange}
              >
                <MenuItem value={"true"}>Add</MenuItem>
                <MenuItem value={"false"}>Remove</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={createTakeWarehouse}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Add Take
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
