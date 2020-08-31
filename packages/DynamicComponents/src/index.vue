
<template>
  <div class="comps">
    <component
      :is="component"
      @clickEvent="getPropsData"
      v-if="component"
      :randomId="randomId"
      :height="height"
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
      height: 200,
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
        ? () => import(`@/${this.componentPath}.vue`)
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
          this.component = () => import(`@/${this.componentPath}.vue`);
        });
    } else {
      this.component = this.componentName;
    }
    this.$nextTick(() => {
      const MIN_HEIGHT = 32;
      if (this.$parent) {
      

        this.$parent.$on("afterResize", (evt) => {
          console.log(evt);
          // this.component.chart.resize();
          this.randomId = Math.random();
          this.height = this.isEdited ? evt.height - MIN_HEIGHT : evt.height;
          console.log(evt.height);
        });
      }
    });
  },
};
</script>

<style lang='scss'>
</style>

