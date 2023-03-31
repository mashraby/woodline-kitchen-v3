import React, { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ReloadContext } from "../../../context/reload.context";
import { IAddFoodProps } from "../../../interfaces/foods.interfaces";
import { ICategory } from "../../../interfaces/categorys.interfaces";
import { getCategory, getProducts, postFood } from "../../../services/api";
import { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import { IProduct } from "../../../interfaces/products.interface";
import accounting from "accounting";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IInputProps {
  product: string;
  amount: number;
  cost: number;
}

export const AddFoodModal: React.FC<IAddFoodProps> = (props) => {
  const { open, setOpen } = props;
  const [ctgs, setCtgs] = useState<ICategory[]>([]);
  const handleClose = () => setOpen(false);
  const [nameEmpty, setNameEmty] = useState<boolean>(false);
  const [costEmpty, setCostEmty] = useState<boolean>(false);
  const [ctgEmpty, setCtgEmty] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [selectedCtg, setSelectedCtg] = React.useState("");
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [inputs, setInputs] = useState<Array<IInputProps>>([
    {
      product: "",
      amount: 0,
      cost: 0,
    },
  ]);
  const [sumMoney, setSumMoney] = useState<number>(0);
  const [check, setCheck] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setCtgEmty(false);
    setSelectedCtg(event.target.value as string);
  };
  const { reload, setReload } = useContext(ReloadContext);

  useEffect((): void => {
    getCategory().then((data) => {
      setCtgs(data);
    });
  }, [reload]);

  useEffect(() => {
    const sum = inputs
      ?.map((e) => e.cost * e.amount)
      .reduce((n1, n2) => n1 + n2);

    setSumMoney(sum);
  }, [inputs, check]);

  const handlePostFood = (): void => {
    if (name !== "" && cost !== 0 && selectedCtg !== "") {
      postFood(
        name,
        cost,
        selectedCtg,
        inputs[0].product !== "" ? [...inputs] : []
      )
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Food yaratildi!");
          }
        })
        .finally(() => {
          setOpen(false);
          setReload(!reload);
          setName("");
          setCost(0);
          setSelectedCtg("");
          setReload(!reload);
        })
        .catch((err: AxiosError) => {
          if (err) {
            toast.error("Food yaratilmadi qayta urinib ko'ring!");
          }
        });
    } else {
      setNameEmty(true);
      setCostEmty(true);
      setCtgEmty(true);
    }
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, [reload]);

  const handleFocus = (e: any, i: number) => {
    if (e.ctrlKey && e.key === "x") {
      if (inputs.length > 1) {
        setInputs(inputs?.filter((_, index) => index !== i));
      }
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
              Добавить еду
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <Box
                sx={{
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  error={nameEmpty ? true : false}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    setNameEmty(false);
                    setName(e.target.value);
                  }}
                  sx={{ mt: 2 }}
                  id={nameEmpty ? "outlined-error" : "outlined-basic"}
                  label={
                    nameEmpty ? "Введите значение" : "Напишите название еды"
                  }
                  variant="outlined"
                />
                <TextField
                  error={costEmpty ? true : false}
                  type="number"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    setCostEmty(false);
                    setCost(+e.target.value);
                  }}
                  sx={{ my: 2 }}
                  id={costEmpty ? "outlined-error" : "outlined-basic"}
                  label={
                    costEmpty ? "Введите значение" : "Напишите стоимость еды"
                  }
                  variant="outlined"
                />
                <FormControl sx={{ mb: 2 }}>
                  <InputLabel
                    id={
                      ctgEmpty
                        ? "demo-simple-select-error-label"
                        : "demo-simple-select-label"
                    }
                  >
                    {ctgEmpty ? "Введите значение" : "Выберите категорию еды"}
                  </InputLabel>
                  <Select
                    error={ctgEmpty ? true : false}
                    labelId={
                      ctgEmpty
                        ? "demo-simple-select-error-label"
                        : "demo-simple-select-label"
                    }
                    id={
                      ctgEmpty
                        ? "demo-simple-select-error"
                        : "demo-simple-select"
                    }
                    value={selectedCtg}
                    label="Age"
                    onChange={handleChange}
                  >
                    {ctgs &&
                      ctgs.map((c, i) => {
                        return (
                          <MenuItem key={i + 1} value={c._id}>
                            {c.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <Typography sx={{ mb: 1 }} variant="h5">
                  Цена тела: {accounting.formatNumber(cost, 0, " ") + " so'm"}
                </Typography>
                <Typography sx={{ mb: 3 }} variant="h5">
                  Общая стоимость:{" "}
                  {accounting.formatNumber(sumMoney, 0, " ") + " so'm"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                {inputs &&
                  inputs.map((e, i) => (
                    <Box
                      key={i + 13}
                      sx={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <Autocomplete
                        onKeyDown={(evt) => handleFocus(evt, i)}
                        onChange={(evt, newVal) => {
                          if (
                            newVal?.cost !== undefined &&
                            newVal.value !== undefined
                          ) {
                            e.product = newVal?.value;
                            e.cost = newVal?.cost;
                          }
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={products?.map((prod) => {
                          return {
                            label: prod.name,
                            value: prod._id,
                            cost: prod.cost,
                          };
                        })}
                        sx={{ width: "250px" }}
                        renderInput={(params) => (
                          <TextField
                            onChange={(evt) => {
                              console.log(evt.target.value);
                            }}
                            {...params}
                            label={`product ${i + 1}`}
                          />
                        )}
                      />
                      <TextField
                        onKeyDown={(evt) => handleFocus(evt, i)}
                        onChange={(evt) => {
                          e.amount = +evt.target.value;
                          setCheck(!check);
                        }}
                        sx={{ width: "150px" }}
                        type="number"
                        variant="outlined"
                        label={`amount ${i + 1}`}
                      />
                    </Box>
                  ))}
                <Button
                  onClick={() => {
                    setInputs([
                      ...inputs,
                      {
                        product: "",
                        amount: 0,
                        cost: 0,
                      },
                    ]);
                  }}
                  sx={{ my: "15px" }}
                  variant="outlined"
                  fullWidth
                >
                  добавить больше продуктов +
                </Button>
              </Box>
            </Box>
            <Button
              onClick={handlePostFood}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Добавить еду
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
