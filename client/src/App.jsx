import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"


import themeConfigs from "./configs/theme.configs"

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode)
  return (
    <ThemeProvider theme={themeConfigs.custom({mode: themeMode})}>
      {/* config toastify */}
      <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* mui reset css */}
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
