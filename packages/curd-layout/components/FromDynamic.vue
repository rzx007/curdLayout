<template>
  <!-- 表格查询条件操作栏 -->
  <div class="curd_tool" :style="'text-align: '+this.toolAlign">
    <template v-for="(item, rowIndex) in data">
      <template v-if="item.type==='date'">
        <div :key="'item'+rowIndex" class="curd_tool_item">
          <label>{{item.label}}：</label>
          <DatePicker
            :type="item.type"
            :disabled="item.disabled"
            :placeholder="getPlaceholder(item)"
            v-model="fromData[item.name]"
            @on-change="formatDate"
          ></DatePicker>
        </div>
      </template>
      <template v-else-if="item.type==='select'">
        <div :key="'item'+rowIndex" class="curd_tool_item">
          <label>{{item.label}}：</label>
          <Select
            v-model="fromData[item.name]"
            style="width:180px"
            filterable
            clearable
            :multiple="item.multiple?true:false"
          >
            <Option v-for="(ele,i) in item.options" :value="ele.value" :key="ele.value+i">{{ ele.label }}</Option>
          </Select>
        </div>
      </template>
      <template v-else>
        <div :key="'item'+rowIndex" class="curd_tool_item">
          <label>{{item.label}}：</label>
          <Input
            :type="item.type"
            v-model="fromData[item.name]"
            :placeholder="getPlaceholder(item)"
            :readonly="item.readonly"
            :disabled="item.disabled"
            :icon="item.icon"
            class="input_text"
          ></Input>
        </div>
      </template>
    </template>
    <!-- 插槽，添加自定义 -->
    <slot name="tool"></slot>
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
        "timerange"
      ]
    };
  },
  props: {
    data: {},
    toolAlign: {
      default: "left"
    }
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
    formatDate(date, name) {
      if (this.typeArr.includes(name))
        this.data.forEach(item => {
          if (item.type == name) {
            this.fromData[item.name] = date;
            this.$emit("on-change", this.fromData);
            console.log(this.fromData[item.name]);
          }
        });
    },
    defaultDate() {
      this.data.forEach(item => {
        if (this.typeArr.includes(item.type)) {
          item.default
            ? (this.fromData[item.name] = item.default)
            : (this.fromData[item.name] = this.$day().format(item.format));

          this.$emit("on-change", this.fromData);
        }
      });
    }
  },
  watch: {
    fromData: {
      // eslint-disable-next-line no-unused-vars
      handler: function(val, oldVal) {
        console.log("running");
        this.$emit("on-change", val);
      },
      deep: true
    }
  },
  created() {
    if (this.data) {
      this.defaultDate();
    }
  }
};
</script>
<style lang='less' scoped>
.curd_tool {
  margin-bottom: 12px;
  button {
    margin-right: 12px;
  }
  .curd_tool_item {
    display: inline-block;
    // width: 220px;
    margin-right: 12px;
    > label {
      margin-right: 5px;
    }
    .input_text {
      width: 180px;
    }
  }
}
</style>