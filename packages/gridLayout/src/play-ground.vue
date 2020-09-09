<template>
  <div class="paly_ground">
    <div class="container-fluid">
      <template v-for="(items,index) in arr1">
        <draggable class="row" group="site" :key="index">
          <div class="col_item col-4" v-for="item in items.grid.children" :key="item.id">
            <div class="col_item">{{item.name}}</div>
          </div>
        </draggable>
      </template>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap-grid.min.css";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      arr1: [
        {
          grid: {
            id: 11,
            children: [
              { id: 1, name: "www.itxst.com" },
              { id: 2, name: "www.jd.com" },
              { id: 3, name: "www.baidu.com" },
              { id: 4, name: "www.taobao.com" },
            ],
          },
        },
        {
          grid: {
            id: 22,
            children: [
              { id: 1, name: "www.itxst.com" },
              { id: 2, name: "www.jd.com" },
              { id: 3, name: "www.baidu.com" },
              { id: 4, name: "www.taobao.com" },
            ],
          },
        },
      ],
    };
  },
  props: {
    nodeArr: {
      type: Array,
    },
  },
  components: {
    draggable,
  },
};
</script>
<style lang='less'>
.col_item {
  background-color: blueviolet;
  color: wheat;
  line-height: 50px;
}
</style>