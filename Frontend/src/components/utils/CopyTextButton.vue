<template>
  <v-tooltip text="Copiar">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        size="x-small"
        color="accent"
        :variant="variant"
        @click="copy"
        class="mx-1"
      >
        <v-icon :color="variant === 'elevated' ? 'white' : color"
          >mdi-content-copy</v-icon
        >
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script>
import { copyText } from "vue3-clipboard";
import { toast } from "vue3-toastify";

export default {
  props: {
    data: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: "elevated",
    },
    color: {
      type: String,
      default: "white",
    },
  },

  methods: {
    copy() {
      copyText(this.data, undefined, (error) => {
        if (error) {
          toast.error("Error ao copiar valor!");
        } else {
          toast.success("Valor copiado com sucesso!", {
            autoClose: 1000,
          });
        }
      });
    },
  },
};
</script>
