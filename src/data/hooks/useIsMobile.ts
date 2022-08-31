import { useTheme, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";

export default function useIsMobile(): boolean {
  const theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile;
}
