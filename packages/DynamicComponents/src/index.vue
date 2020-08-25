
<template>
  <div class="comps">
    <component :is="component" @clickEvent="getPropsData" v-if="component" v-bind="data"></component>
  </div>
</template>

<script>
export default {
  name: "dynamicComponent",
  data() {
    return {
      component: "",
    };
  },
  // props: ["componentName", "data"],
  props: {
    componentName: {
      // eslint-disable-next-line no-unused-vars
      validator: function (value) {
        return true;
      },
    },
    componentPath: {
      type: String,
    },
    data: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    getPropsData(msg) {
      this.$emit("clickEvnet", msg);
    },
  },
  computed: {
    // 异步组件路径@,无法解析，需要显示填写
    loader() {
      return this.componentPath
        ? () => import(`@/${this.componentPath}.vue`)
        : "";
    },
  },
  mounted() {
    if (this.componentPath) {
      this.loader()
        .then(() => {
          this.component = () => this.loader();
        })
        .catch(() => {
          this.component = () => import(`@/${this.componentPath}.vue`);
        });
    } else {
      this.component = this.componentName;
    }
  },
};
</script>

<style lang='scss'>
</style>

