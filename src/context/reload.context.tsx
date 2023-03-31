import React, { createContext, useState } from "react";
import { IReloadProps } from "../interfaces/reload.context.interface";

const ReloadContext = createContext<IReloadProps>({
  reload: false,
  setReload: () => {},
});

function Provider({ children }: { children: React.ReactNode }) {
  const [reload, setReload] = useState<boolean>(false);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      {children}
    </ReloadContext.Provider>
  );
}

export { ReloadContext, Provider };
