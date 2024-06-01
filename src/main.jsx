import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    600: "#3182ce",
    500: "#4299e1",
    400: "#63b3ed",
    300: "#90cdf4",
    200: "#bee3f8",
    100: "#ebf8ff",
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