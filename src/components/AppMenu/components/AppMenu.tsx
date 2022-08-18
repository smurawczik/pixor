import { AppBar, Toolbar } from "@mui/material";
import { FileMenu } from "./FileMenu";
import { ViewsMenu } from "./ViewsMenu";

export const AppMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <FileMenu />
        <ViewsMenu />
      </Toolbar>
    </AppBar>
  );
};
