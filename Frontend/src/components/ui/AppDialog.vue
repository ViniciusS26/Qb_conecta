<template>
  <v-dialog :model-value="show" :width="width" :persistent="true" scrollable>
    <v-card class="rounded-lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ title }}</span>
        <v-icon size="smal" @click="$emit('cancel')">mdi-close</v-icon>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions v-if="!hideFooter">
        <v-spacer></v-spacer>
        <v-btn @click="$emit('cancel')" variant="outlined">
          {{ btnCancel }}
        </v-btn>
        <v-btn 
					v-if="btnConfirmShow"
          :color="btnConfirmColor"
          @click="$emit('confirm')"
          variant="elevated"
          :loading="loading"
          :disabled="disabledConfirm"
        >
          {{ btnConfirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "500px",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabledConfirm: {
      type: Boolean,
      default: false,
    },
    btnCancel: {
      type: String,
      default: "Cancel",
    },
		btnConfirmShow: {
			type: Boolean,
			default: true,
		},
    btnConfirm: {
      type: String,
      default: "Confirm",
    },
    btnConfirmColor: {
      type: String,
      default: "green",
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
</style>
