import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { TextField, Typography } from "@mui/material";
import { IDeedlineModalProps } from "../../../interfaces/deedline.interface";
import { updateDeedlines } from "../../../services/api";
import { ReloadContext } from "../../../context/reload.context";
import { toast } from "react-toastify";

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

export const ChangeDeedModal: React.FC<IDeedlineModalProps> = (props) => {
  const { open, setOpen, time: myTime, deedId } = props;
  const handleClose = () => setOpen(false);
  const [time, setTime] = useState<number>();
  const { reload, setReload } = useContext(ReloadContext);

  const updateDeedline = () => {
    if (time !== undefined) {
      setReload(!reload);
      updateDeedlines(deedId, time)
        .then((data) => {
          if (data && data.status === 200) {
            toast.success("Deedline muddati muvaffaqiyatli o'zgartirildi");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Muddat o'zgarmadi qayta urinib ko'ring");
          }
        })
        .finally(() => {
          setTime(undefined)
          setOpen(!open);
        });
    } else {
      toast.warning("Hali vaqtni ozgartirmadingiz")
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Редактировать
            </Typography>
            <TextField
              type="number"
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setTime(+e.target.value);
              }}
              defaultValue={myTime}
              required={true}
              sx={{ my: 2, width: "100%" }}
              id={"outlined-basic"}
              label={"Редактировать"}
              variant="outlined"
            />
            <Button
              onClick={updateDeedline}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<ChangeCircleIcon />}
            >
              Редактировать
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
