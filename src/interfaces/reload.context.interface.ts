import React from "react";

export interface IReloadProps {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}