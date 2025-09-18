/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#406A33",
          secondary: "#128C7E",
          accent: "#25D366",
          error: "#FF0000",
        },
      },
      dark: {
        colors: {
          primary: "#075e54",
          secondary: "#128C7E",
          accent: "#25D366",
          error: "#FF0000",
        },
      },
    },
  },
});
