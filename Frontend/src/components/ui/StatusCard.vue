<template>
  <v-card color="grey-lighten-3" :class="cardClass">
    <v-card-title :class="['d-flex align-center', titleClass]">
      <v-icon :color="iconColor" :size="iconSize" class="mr-2">
        {{ icon }}
      </v-icon>
      <span class="text-truncate">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="showArrow"
        variant="text"
        :color="iconColor"
        :icon="true"
        :size="buttonSize"
        :to="link"
      >
        <v-icon :size="arrowSize"> mdi-arrow-right-thin </v-icon>
      </v-btn>
    </v-card-title>
    <v-divider :color="iconColor"></v-divider>
    <v-card-text :class="contentClass">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      default: "accent",
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    cardClass: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  computed: {
    titleClass() {
      if (this.$vuetify.display.xs) return "text-body-1";
      if (this.$vuetify.display.sm) return "text-body-2";
      return "text-body-1";
    },
    iconSize() {
      if (this.$vuetify.display.xs || this.$vuetify.display.sm) return "small";
      return "default";
    },
    buttonSize() {
      if (this.$vuetify.display.xs) return "x-small";
      if (this.$vuetify.display.sm) return "small";
      return "default";
    },
    arrowSize() {
      if (this.$vuetify.display.xs) return "30px";
      if (this.$vuetify.display.sm) return "30px";
      return "40px";
    },
    contentClass() {
      return this.$vuetify.display.smAndDown ? "pa-2" : "";
    },
  },
};
</script>

<style scoped>
.text-truncate {
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
