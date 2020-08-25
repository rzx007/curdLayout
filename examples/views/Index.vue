<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" router>
          <template v-for="(item,index) in routeArr">
            <el-menu-item :index="item.path" :key="index">{{item.title}}</el-menu-item>
          </template>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import routeArr from "@/mock/router.js";
export default {
  data() {
    return {
      routeArr: routeArr,
    };
  },
  methods: {},
};
</script>
<style lang='scss'>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0 !important;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  min-height: calc(100vh - 62px);
}
</style>
