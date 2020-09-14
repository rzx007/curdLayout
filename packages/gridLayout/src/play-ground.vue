<template>
  <draggable
    v-model="nodeArr"
    group="site"
    :disabled="disabled"
    :scroll="true"
    @end="onEnd"
    @add="changEvent"
    @sort="onSort"
    :move="onMove"
    class="draggable_layout"
  >
    <template v-for="element in nodeArr">
      <!-- {{element}} -->
      <template v-if="element.children">
        <draggable
          :list="element.children"
          :scroll="true"
          :group="{name:'site'}"
          class="row grid_row justify-content-between"
          :class="[disabled?'':'grid_row_disabled']"
          animation="100"
          :key="element.id"
          :disabled="disabled"
          @end="onEnd"
          @add="changEvent"
          @sort="onSort"
          :move="onMove"
        >
          <template v-for="(item) in element.children">
            <div
              class="col_item col-sm-12 col-md-6 companent_wrap"
              :class="[item.size?'col-xl-'+item.size+' col-lg-'+item.size:'col-6']"
              :key="item.id"
              @click.stop="chooseNode(item)"
              v-if="item.type==='col'"
            >
              <template v-if="item.componentName||item.componentPath">
                <div
                  class="component_main"
                  :class="[disabled?'':'can_move',!disabled&&checkedId===item.id?'node_active_calss':'']"
                >
                  <dynamic-componentName
                    v-if="item.componentName"
                    :componentName="item.componentName"
                    :data="item.props"
                  ></dynamic-componentName>
                  <dynamic-componentName v-else :componentPath="item.componentPath" :data="item.props"></dynamic-componentName>
                </div>
              </template>
              <template v-if="item.children">
                <playGround v-if="item.children" v-model="item.children" :disabled="disabled"></playGround>
              </template>
            </div>
          </template>
        </draggable>
      </template>
    </template>
  </draggable>
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
      nodeArr: this.value,
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
  watch: {
    value: {
      handler: function (val) {
        this.nodeArr = val;
        console.log(val);
      },
      deep: true,
    },
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
    onEnd() {
      this.$emit("input", this.value);
    },
    onMove(e) {
      console.log(e);
    },
    changEvent() {
      this.curry(this.nodeArr);
      console.log(this.nodeArr);
      this.$emit("input", this.nodeArr);
      console.log(this.nodeArr);
    },
    onSort(e) {
      this.$emit("input", this.value);
      console.log(e);
    },
    curry(arr) {
      arr.forEach((item, index) => {
        if (item.type === "layout") {
          if (arr.length == 1) {
            arr.splice(index, 1, {
              id: (new Date().getTime() + Math.random() * 10).toString(),
              type: "row",
              size: 6,
              children: [],
            });
          } else {
            arr.splice(index, 1, {
              id: (new Date().getTime() + Math.random() * 10).toString(),
              type: "col",
              size: 6,
              children: [{ id: 325, type: "row", children: [] }],
            });
          }
        } else if (item.componentName || item.componentPath) {
          item.id = (new Date().getTime() + Math.random() * 10).toString();
        } else if (item.children && item.children.length > 0) {
          this.curry(item.children);
        }
      });
    },
  },
};
</script>
<style lang='less'>
.draggable_layout {
  position: relative;
}
.grid_row_disabled {
  border: 2px dashed #409eff;
}
.grid_row {
  margin-bottom: 12px;
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
  position: relative;
}
</style>