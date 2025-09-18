<template>
  <div>
    <v-card
      class="d-flex flex-row align-center pb-0"
      :height="height"
      elevation="2"
    >
      <v-card-title>
        <v-btn
          v-if="btnBackButton"
          icon="mdi-chevron-left"
          variant="text"
          color="primary"
          class="mr-2"
          @click="$router.back()"
        >
        </v-btn>
        <span>{{ title }}</span>
      </v-card-title>

      <v-card-text class="mr-2 pa-0"> </v-card-text>

      <v-card-actions class="mr-2 pa-0">
        <v-row>
          <v-col
            v-if="btnPrincipalShow"
            class="d-flex justify-space-between align-center pa-0"
          >
            <v-btn
              color="green"
              variant="elevated"
              @click="$emit('pressButton')"
              v-tooltip:top="btnPrincipalTooltip"
            >
              <v-icon>{{ btnPrincipalIcon }}</v-icon>
              <span>{{ btnPrincipalText }}</span>
            </v-btn>
          </v-col>
          <v-col>
            <slot></slot>
          </v-col>
          <v-col v-if="btnActionsShow">
            <v-btn
              color="green"
              variant="elevated"
              @click="$emit('pressButton')"
            >
              <v-icon>{{ btnActionsIcon }}</v-icon>
              <span>{{ btnActionsText }}</span>
            </v-btn>
          </v-col>
          <v-col
            v-if="labelActionsShow"
            class="d-flex align-center justify-center"
          >
            <v-combobox
              clearable
              :label="labelText"
              :items="labelData.map((item) => item.name)"
              v-model="selectedValue"
              variant="outlined"
              density="compact"
              rounded
              hide-details
              @update:model-value="emitSelectedValue"
              width="400"
            />
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <bread-crumb v-if="breadCrumbShow"></bread-crumb>
  </div>
</template>

<script>
import BreadCrumb from "@/components/ui/BreadCrumb.vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "70px",
    },
    btnPrincipalShow: {
      type: Boolean,
      default: true,
    },
    btnPrincipalText: {
      type: String,
      default: "New button",
      required: false,
    },
    btnPrincipalIcon: {
      type: String,
      default: "mdi-plus",
    },
    btnPrincipalTooltip: {
      type: String,
      default: "New button",
      required: false,
    },
    actionsShow: {
      type: Boolean,
      default: false,
    },
    btnActionsShow: {
      type: Boolean,
      default: false,
    },
    btnActionsText: {
      type: String,
      default: "New button",
      required: false,
    },
    btnActionsIcon: {
      type: String,
      default: "mdi-plus",
    },
    btnBackButton: {
      type: Boolean,
      default: false,
    },
    breadCrumbShow: {
      type: Boolean,
      default: false,
    },
    labelActionsShow: {
      type: Boolean,
      default: false,
    },
    labelText: {
      type: String,
      default: "label",
      required: false,
    },
    labelData: {
      type: Array,
      default: [],
      required: false,
    },
  },
  components: {
    BreadCrumb,
  },
  data() {
    return {
      selectedValue: "",
    };
  },
  methods: {
    emitSelectedValue(value) {
      if (value === null) {
        this.$emit("selectedValue", null);
        return;
      } else {
        this.$emit(
          "selectedValue",
          this.labelData.find((item) => item.name === value)
        );
      }
    },
  },
};
</script>
