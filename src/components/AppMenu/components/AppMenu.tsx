import { AppBar, Box, Toolbar } from "@mui/material";
import { FileMenu } from "./FileMenu";
import { ViewsMenu } from "./ViewsMenu";

export const AppMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box>
          <FileMenu />
        </Box>
        <Box sx={{ ml: 1 }}>
          <ViewsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
