import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    900: "#0D3B66", // Dark Blue
    800: "#145DA0", // Medium Dark Blue
    700: "#1E81B0", // Medium Blue
    600: "#2081C3", // Medium Light Blue
    500: "#3D9DD1", // Light Blue
    400: "#68B2E8", // Lighter Blue
    300: "#A3D5F7", // Very Light Blue
    200: "#CFE8FF", // Pale Blue
    100: "#EAF6FF", // Very Pale Blue
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "gray.900")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

const theme = extendTheme({ colors, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);