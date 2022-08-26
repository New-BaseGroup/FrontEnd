<template>
  <input type="text" name="expense-name" v-model="expenseName" />
</template>

<script>
export default {
  emits: ["expense-name"],
  data() {
    return {
      expenseName: "ssaass",
    };
  },

  methods: {
    forwardData() {
      this.$emit("expense-name", this.expenseName);
    },
  },
};
</script>
