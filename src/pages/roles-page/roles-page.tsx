import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { IRole } from "../../interfaces/roles.interfaces";
import { getRoles } from "../../services/api";
import { RolesTable } from "../roles-page/roles-table/roles-table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styled from "styled-components";
import { AddRoleModal } from "./add-role-modal/add-role-modal";
import { ReloadContext } from "../../context/reload.context";
  
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const RolesPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    getRoles().then((data) => {
      setRoles(data);
    });
  }, [reload]);

  return (
    <>
      <AddRoleModal open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            px: 3,
            py: 12,
          }}
        >
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Роли
            </Typography>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
            >
              Добавить роль
            </Button>
          </FlexWrapper>
          <RolesTable roles={roles} />
        </Box>
      </Box>
    </>
  );
};
