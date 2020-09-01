<template>
  <div class="model_main">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      label-position="left"
    >
      <FormItem label="主题名称" prop="name">
        <Input :disabled="isDisable" v-model="formValidate.name" placeholder="主题名称"></Input>
      </FormItem>
      <FormItem label="创建者">
        <p>admin</p>
      </FormItem>
      <FormItem label="创建时间">
        <p>{{formValidate.createTime}}</p>
      </FormItem>
      <FormItem label="描述" prop="comments">
        <Input
          :disabled="isDisable"
          v-model="formValidate.comments"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="输入描述"
        ></Input>
      </FormItem>
      <FormItem v-show="!isDisable">
        <Button type="primary" @click="handleSubmit('formValidate')" size="small">保存</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px" size="small">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "model-detail",
  data() {
    return {
      ruleValidate: {
        name: [
          {
            required: true,
            message: "主题名称不可为空！",
            trigger: "blur"
          }
        ],
        comments: [
          {
            required: true,
            message: "请输入对主题的描述",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    isDisable: {
      type: Boolean,
      default: true
    },
    formValidate: {
      type: Object,
      default: function() {
        return {
          name: "",
          createTime: '',
          creator: "",
          comments: ""
        };
      }
    }
  },
  methods: {
    
  }
};
</script>
<style lang='less'>
.model_main {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}
</style>