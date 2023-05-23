import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import accounting from "accounting";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { IFood, IFoodById } from "../../interfaces/foods.interfaces";
import { deleteProductById, foodById } from "../../services/api.service";
import Divider from "@mui/material/Divider";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import { ChangeFoodModal } from "./change-price-modal/change-price-modal";
import { ReloadContext } from "../../context/reload.context";
import { AddNewProductModal } from "./add-new-product/newProduct";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeAmountModal } from "./change-amount-modal/amount-modal";
import { toast } from "react-toastify";

const style = {
  width: "100%",
  maxWidth: "700px",
  bgcolor: "background.paper",
};

export const FoodById: React.FC = () => {
  const [food, setFood] = useState<IFoodById>({
    _id: "",
    name: "",
    cost: 0,
    category: {
      _id: "",
      name: "",
    },
    products: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const { foodId } = useParams<{ foodId: string }>();

  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [newProdOpen, setNewProdOpen] = useState<boolean>(false);
  const [amountOpen, setAmountOpen] = useState<boolean>(false);
  const [oldCost, setOldCost] = useState<number>();
  const [oldAmount, setOldAmount] = useState<number>();
  const [prodId, setProdId] = useState<string>("");
  const [id, setId] = useState<string>("");
  const { reload, setReload } = useContext(ReloadContext);
  const editableRef = useRef();

  const handleChangeClick = (food: IFoodById): void => {
    setChangeOpen(true);
    setOldCost(food.cost);
    setId(food._id);
  };

  useEffect(() => {
    foodById(foodId as string)
      .then((data: IFoodById) => {
        setFood(data);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          window.localStorage.removeItem("token");
          window.location.reload();
          window.location.href = "/login";
        }
      });
  }, [reload]);

  const EditProduct = (pId: string, amnt: number) => {
    setAmountOpen(true);
    setProdId(pId);
    setOldAmount(amnt);
  };

  const handleDeleteProduct = (prod: string) => {
    setReload(!reload);
    deleteProductById(foodId as string, prod)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          toast.success("Product muvaffaqiyatli o'chirildi");
        }
      })
      .catch((err: AxiosError) => {
        if (err) {
          toast.error("product ochmadi qayta urinib koring");
        }
      });
  };

  const [prc, setPrc] = useState<number>(0);

  useEffect(() => {
    const priceFood = food.products
      ?.map((p) => {
        return p.product?.cost * p.amount;
      })
      ?.reduce((a, b) => a + b, 0);
    setPrc(priceFood);
  }, [food]);

  return (
    <>
      <ChangeFoodModal
        foodId={id}
        oldCost={oldCost}
        changeOpen={changeOpen}
        setChangeOpen={setChangeOpen}
      />

      <AddNewProductModal
        newProdOpen={newProdOpen}
        setNewProdOpen={setNewProdOpen}
        foodId={foodId}
      />

      <ChangeAmountModal
        changeFoodId={foodId}
        prodId={prodId}
        amount={oldAmount}
        amountOpen={amountOpen}
        setAmountOpen={setAmountOpen}
      />

      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <Link
            style={{ fontSize: "22px", marginBottom: "15px" }}
            to={`/foods`}
          >
            {"< Назад"}
          </Link>
          <Box
            sx={{
              m: 4,
              p: 4,
              w: 1,
              minHeight: "65vh",
              display: "flex",
              alignItems: "baseline",
              gap: "100px",
              boxShadow: "5px 5px 70px rgba(0, 0, 0, 0.14)",
              borderRadius: "16px",
            }}
          >
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.14)",
                fontSize: "22px",
              }}
            >
              <Typography variant="h5" component="h2">
                Название еды:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  {food?.name}
                </span>
              </Typography>

              <Typography variant="h5" component="h2">
                Стоимость еды:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  {accounting.formatNumber(food?.cost, 0, " ") + " so'm"}
                </span>
              </Typography>

              <Typography variant="h5" component="h2">
                Изначальная цена:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  {accounting.formatNumber(prc, 0, " ") + " so'm"}
                </span>
              </Typography>

              <Typography variant="h5" component="h2">
                {food.cost - prc > 0 ? "Выгода" : "Вред"}:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  {accounting.formatNumber(food.cost - prc, 0, " ") + " so'm"}
                </span>
              </Typography>
              <Typography variant="h5" component="h2">
                Категория еды:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  {food?.category.name}
                </span>
              </Typography>

              <Button
                onClick={() => handleChangeClick(food)}
                variant="contained"
              >
                Изменить стоимость
              </Button>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  mb: 4,
                }}
              >
                <Typography variant="h4" component="h2">
                  Продукт питания
                </Typography>
                <Button
                  onClick={() => setNewProdOpen(true)}
                  variant="contained"
                >
                  Добавить продукт
                </Button>
              </Box>
              <Grid item xs={12} md={6}>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  {food?.products.map((prod: any) => {
                    return (
                      <>
                        <ListItem
                          key={prod._id}
                          sx={{
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <ListItemText primary={prod.product?.name} />
                          <ListItemText
                            ref={editableRef}
                            primary={prod.amount}
                          />
                          <Button
                            onClick={() =>
                              EditProduct(prod.product._id, prod.amount)
                            }
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            onClick={() =>
                              handleDeleteProduct(prod.product._id)
                            }
                          >
                            <DeleteIcon />
                          </Button>
                        </ListItem>
                        <Divider />
                      </>
                    );
                  })}
                </List>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
