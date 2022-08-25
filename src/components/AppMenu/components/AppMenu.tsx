import { AppBar, Box, Toolbar } from "@mui/material";
import { EditMenuOptions } from "./EditMenu.Options";
import { FileMenuOptions } from "./FileMenu.Options";
import { GenericMenu } from "./GenericMenu";
import { ImageMenuOptions } from "./ImageMenu.Options";
import { ViewsMenuOptions } from "./ViewsMenu.Options";

export const AppMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box>
          <GenericMenu name="File" MenuListComponent={FileMenuOptions} />
        </Box>
        <Box sx={{ ml: 2 }}>
          <GenericMenu name="edit" MenuListComponent={EditMenuOptions} />
        </Box>
        <Box sx={{ ml: 2 }}>
          <GenericMenu name="Views" MenuListComponent={ViewsMenuOptions} />
        </Box>
        <Box sx={{ ml: 2 }}>
          <GenericMenu name="Image" MenuListComponent={ImageMenuOptions} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
