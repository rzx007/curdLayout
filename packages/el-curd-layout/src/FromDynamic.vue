<template>
  <div class="curd_tool_bar">
    <div class="curd_tool_content">
      <div class="curd_tools">
        <template v-for="(item, index) in searchDynamic">
          <template v-if="item.type==='date'">
            <div :key="'item'+index" class="curd_tool_item">
              <label class="label">{{item.label}}：</label>
              <el-date-picker
                :type="item.type"
                :disabled="item.disabled"
                :format="item.format?item.format:'yyyy-MM-dd'"
                :value-format="item.format?item.format:'yyyy-MM-dd'"
                :placeholder="getPlaceholder(item)"
                clearable
                v-model="fromData[item.name]"
                size="mini"
              ></el-date-picker>
            </div>
          </template>
          <template v-else-if="item.type==='select'">
            <div :key="'item'+index" class="curd_tool_item">
              <label class="label">{{item.label}}：</label>
              <el-select
                v-model="fromData[item.name]"
                style="width:180px"
                filterable
                clearable
                :multiple="item.multiple?true:false"
                size="mini"
              >
                <el-option
                  v-for="(ele,i) in item.options"
                  :value="ele.value"
                  :key="ele.value+i"
                >{{ ele.label }}</el-option>
              </el-select>
            </div>
          </template>
          <template v-else>
            <div class="curd_tool_item" :key="index">
              <label class="label">{{item.label}}:</label>
              <el-input
                v-model="fromData[item.name]"
                :placeholder="getPlaceholder(item)"
                size="mini"
              ></el-input>
            </div>
          </template>
        </template>
      </div>
      <div class="btns">
        <el-button type="primary" size="mini" @click="query()" round>查询</el-button>
        <slot name="tool"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromData: {},
      typeArr: [
        "date",
        "daterange",
        "datetime",
        "datetimerange",
        "year",
        "month",
        "time",
        "timerange",
      ],
    };
  },
  props: {
    searchDynamic: {},
    toolAlign: {
      default: "left",
    },
  },
  methods: {
    getPlaceholder(item) {
      if (this.placeholderLabel) {
        return item.label;
      }
      let result;
      if (item.placeholder == null) {
        switch (item.type) {
          case "text":
            result = item.disabled || item.readonly ? "" : item.label;
            break;
          case "popText":
            result = item.disabled || item.readonly ? "" : "请选择...";
            break;
          case "time":
            result = item.disabled || item.readonly ? "" : "选择时间";
            break;
          case "datetime":
          case "date":
            result = item.disabled || item.readonly ? "" : "选择日期";
            break;
          case "datetimerange":
            result = item.disabled || item.readonly ? "" : "选择时间段";
            break;
          case "year":
            result = item.disabled || item.readonly ? "" : "选择年份";
            break;
          default:
            result = "";
            break;
        }
      } else {
        result = item.placeholder;
      }
      return result;
    },
    defaultDate() {
      //  时间控件初始值
      this.searchDynamic.forEach((item) => {
        for (const key in item) {
          if (key === "name") {
            let str = item[key];
            this.$set(this.fromData, [str], ""); // 显示设置响应属性
          }
        }
        if (this.typeArr.includes(item.type)) {
          item.default
            ? (this.fromData[item.name] = item.default)
            : (this.fromData[item.name] = new Date());
          this.$emit("params-change", this.fromData);
        }
      });
    },
    query() {
      this.$emit("query", this.fromData);
    },
  },
  created() {
    if (this.searchDynamic) {
      this.defaultDate();
    }
  },
  watch: {
    fromData: {
      // eslint-disable-next-line no-unused-vars
      handler: function (val, oldVal) {
        // console.log(val);
        this.$emit("params-change", val);
      },
      deep: true,
    },
  },
};
</script>
<style lang='scss'>
.curd_tool_bar {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  .curd_tool_content {
    display: flex;
    align-items: flex-start;

    .curd_tools {
      flex: 1;

      .curd_tool_item {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;

        .label {
          font-size: 12px;
          color: #797373;
        }

        .el-input {
          width: 200px;
        }
      }
    }

    .btns {
      max-width: 800px;
    }
  }
}
</style>