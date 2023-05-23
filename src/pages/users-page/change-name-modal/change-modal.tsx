import React, { useContext, useState } from "react";
import { TextField, Typography, Button, Modal, Box } from "@mui/material";
import { IChangeUsernameProps } from "../../../interfaces/users.interfaces";
import { ReloadContext } from "../../../context/reload.context";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { toast } from "react-toastify";
import { updateUsername } from "../../../services/api.service";
import { AxiosError, AxiosResponse } from "axios";

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

export const ChangeUserNameModal: React.FC<IChangeUsernameProps> = (props) => {
  const { nameOpen, setNameOpen, user, id } = props;
  const handleClose = () => setNameOpen(false);
  const { reload, setReload } = useContext(ReloadContext);
  const [newUserName, setNewUserName] = useState<string>("");

  const handleChangeUserName = () => {
    if (newUserName !== "") {
      updateUsername(id, newUserName)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Username muvaffaqiyatli ozgartirildi");
          }
        })
        .catch((err: AxiosError) => {
          if (err) {
            toast.error("Username ozgarmadi qayta urinib koring");
          }
        })
        .finally(() => {
          setReload(!reload);
          setNewUserName("");
          setNameOpen(false);
        });
    } else {
      toast.warning("Usernameni hali o'zgartirmadingiz!");
    }
  };

  return (
    <div>
      <Modal
        open={nameOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ mb: 1.5 }} id="modal-modal-title" variant="h4">
            Change User Name
          </Typography>

          <TextField
            onChange={(evt) => setNewUserName(evt.target.value)}
            sx={{ my: 3 }}
            fullWidth
            type="text"
            variant="outlined"
            label="Enter a new name"
            defaultValue={user}
          />
          <Button
            onClick={handleChangeUserName}
            sx={{ width: 1 }}
            variant="contained"
            endIcon={<ChangeCircleIcon />}
          >
            Изменить пользователя
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
