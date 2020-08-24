<template>
  <div class="home">
    <el-button type="primary">按钮</el-button>
    <color-picker></color-picker>
      <div class="primary-border-color">
    <el-curd-layout
      :tableOptions="tableOptions"
      :fromOptions="fromOptions"
      :treeOptions="treeOptions"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @selection-change="selectionChange"
    >
      <template v-slot:action="Props">
        <el-button size="small" @click="getRow(Props)">action</el-button>
      </template>
      <template v-slot:proflies="Props">
        <el-button size="small" @click="getRow(Props)">proflies</el-button>
      </template>
      <template v-slot:operation="Props">
        <el-button size="small" @click="getRow(Props)">operation</el-button>
      </template>
    </el-curd-layout>
  </div>
  </div>
</template>

<script>
const tableOptions = {
  pageSize: 20,
  showPanelTool: true,
  params: {},
  dataUrl: "/data-project-management-service/project/getProject",
  columns: [
    { type: "selection", width: 70, align: "center" },
    { type: "index", label: "序号", align: "center", width: 80 },
    {
      label: "用户信息",
      align: "center",
      headerAlign: "center",
      children: [
        {
          prop: "creator",
          label: "角色名",
          align: "center",
          width: 180,
        },
        { prop: "creator", label: "用户年龄", align: "center" },
        { label: "用户", slot: "proflies", align: "center" },
        { label: "操作", slot: "operation", width: 150, align: "center" },
      ],
    },
    { label: "Action", slot: "action", width: 150, align: "center" },
  ],
};
const fromOptions = [
  { name: "description", label: "角色描述", span: 6, type: "text" },
  {
    name: "occurTime",
    label: "日期",
    span: 6,
    type: "date",
    format: "yyyy-MM-dd"
  },
  {
    name: "code",
    label: "电压等级",
    type: "select",
    options: [],
  },
];
const treeOptions = {
  dataUrl: "/data-project-management-service/project/getProject",
};
export default {
  data() {
    return { tableOptions, fromOptions, treeOptions };
  },
  methods: {
    rowClick(row) {
      console.log(row);
    },
    rowDblclick(row) {
      console.log(row);
    },
    selectionChange(selection) {
      console.log(selection);
    },
    getRow(row) {
      console.log(row);
    },
  },
};
</script>
<style lang='scss'>
</style>
