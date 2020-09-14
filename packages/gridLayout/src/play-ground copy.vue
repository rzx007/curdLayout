<template>
  <div class="paly_ground">
    <draggable
      class="container-fluid"
      v-model="value"
      group="site"
      :disabled="disabled"
      :scroll="true"
      @end="onEnd"
      @add="changEvent"
      @sort="onSort"
      :move="onMove"
    >
      <template v-for="element in value">
        <template v-if="element.type==='row'">
          <draggable
            :list="value"
            :scroll="true"
            :group="{name:'site'}"
            class="row grid_row justify-content-between"
            animation="100"
            :key="element.id"
            :disabled="disabled"
            @end="onEnd"
            @add="changEvent"
            @sort="onSort"
            :move="onMove"
          >
            <div
              class="col_item col-sm-12 col-md-6 companent_wrap"
              :class="[item.size?'col-xl-'+item.size+' col-lg-'+item.size:'col-6']"
              v-for="item in element.children"
              :key="item.id"
              @click.stop="chooseNode(item)"
            >
              <template v-if="item.type==='col'">
                <div
                  class="component_main"
                  :class="[disabled?'':'can_move',!disabled&&checkedId===item.id?'node_active_calss':'']"
                >
                  <dynamic-component :componentName="item.component"></dynamic-component>
                </div>
              </template>
              <template v-if="item.type==='row'">
                <playGround v-if="item.children" v-model="item.children" :disabled="disabled"></playGround>
              </template>
            </div>
          </draggable>
        </template>
        <div
          v-if="element.type==='col'"
          :key="element.id"
          class="row grid_row justify-content-between"
        >
          <div
            class="col_item col-sm-12 col-md-6 companent_wrap"
            :class="[element.size?'col-xl-'+element.size+' col-lg-'+element.size:'col-6']"
            :key="element.id"
            @click.stop="chooseNode(element)"
          >
            <div
              class="component_main"
              :class="[disabled?'':'can_move',!disabled&&checkedId===element.id?'node_active_calss':'']"
            >
              <dynamic-component :componentName="element.component"></dynamic-component>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap-grid.min.css";
import draggable from "vuedraggable";
import bus from "../../bus/index";
export default {
  name: "playGround",
  data() {
    return {
      checkedId: null,
    };
  },
  props: {
    value: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    draggable,
  },
  created() {
    console.log(Array.isArray(this.value));
    !Array.isArray(this.value) ? (this.value = Array.push(this.value)) : "";
  },
  methods: {
    chooseNode(item) {
      if (this.checkedId === item.id) {
        this.checkedId = null;
      } else {
        this.checkedId = item.id;
      }
      bus.$emit("choose", item);
    },
    // eslint-disable-next-line no-unused-vars
    onEnd(e) {
      this.$emit("input", this.value);
    },
    onMove(e) {
      console.log(e);
    },
    changEvent(e) {
      this.$emit("input", this.value);
      console.log(e);
    },
    onSort(e) {
      this.$emit("input", this.value);
      console.log(e);
    },
  },
};
</script>
<style lang='less'>
.grid_row {
  margin-bottom: 12px;
  border: 2px dashed #409eff;
}
.col_item {
  color: wheat;
  line-height: 50px;
}
.can_move {
  cursor: move;
  &:hover {
    border: 2px solid #409eff;
  }
  box-sizing: border-box;
}
.node_active_calss {
  border: 2px dashed #409eff;
}
.companent_wrap {
  margin: 15px 0;
}
.component_main {
  box-sizing: border-box;
  width: 100%;
}
</style>