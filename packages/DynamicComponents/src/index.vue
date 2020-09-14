
<template>
  <div class="comps">
    <component
      :is="component"
      @clickEvent="getPropsData"
      v-if="component"
      :randomId="randomId"
      v-bind="data"
    ></component>
  </div>
</template>

<script>
export default {
  name: "dynamicComponent",
  data() {
    return {
      component: "",
      randomId: null,
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
    componentPath: { type: String },
    isEdited: { type: Boolean, default: true },
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
        ? (resolve) => require([`@/${this.componentPath}.vue`], resolve)
        : "";
    },
    layout() {
      return this.height;
    },
  },
  mounted() {
    if (this.componentPath) {
      this.loader()
        .then(() => {
          this.component = () => this.loader();
        })
        .catch(() => {
          this.component = (resolve) =>
            require([`@/${this.componentPath}.vue`], resolve);
        });
    } else {
      this.component = this.componentName;
    }
    this.randomId = Math.random();
  },
};
</script>

<style lang='scss'>
</style>

