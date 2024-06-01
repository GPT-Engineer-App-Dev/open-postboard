import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    900: "#22543d",
    800: "#276749",
    700: "#2f855a",
    600: "#38a169",
    500: "#48bb78",
    400: "#68d391",
    300: "#9ae6b4",
    200: "#c6f6d5",
    100: "#f0fff4",
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("green.100", "green.900")(props),
      color: mode("green.800", "whiteAlpha.900")(props),
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