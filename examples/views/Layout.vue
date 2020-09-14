<template>
  <div>
    {{nodes}}
    <grid-layout v-model="nodes" :componentArr="componentArr" :disabled="disabled"></grid-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodes: [
        {
          type: "row",
          id: 11,
          children: [
            {
              id: 45,
              type: "col",
              size: 5,
              children: [
                {
                  id: 324,
                  type: "row",
                  children: [
                    {
                      id: 641,
                      type: "col",
                      componentPath: "components/line-bar",
                      size: 12,
                    },
                    {
                      id: 642,
                      type: "col",
                      componentPath: "components/HelloWorld",
                      size: 12,
                    },
                  ],
                },
              ],
            },
            {
              id: 46,
              type: "col",
              size: 6,
              children: [
                {
                  id: 325,
                  type: "row",
                  children: [
                    {
                      id: 643,
                      type: "col",
                      componentPath: "components/HelloWorld",
                      size: 12,
                    },
                    {
                      id: 644,
                      type: "col",
                      componentPath: "components/HelloWorld",
                      size: 12,
                    },
                  ],
                },
              ],
            },
            {
              id: 1,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 4,
            },
            {
              id: 2,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 8,
            },
            {
              id: 3,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 5,
            },
            {
              id: 4,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 7,
            },
          ],
        },
        {
          type: "row",
          id: 22,
          children: [
            {
              id: 5,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 4,
            },
            {
              id: 6,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 4,
            },
            {
              id: 7,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 4,
            },
            {
              id: 8,
              type: "col",
              componentPath: "components/HelloWorld",
              size: 12,
            },
          ],
        },
      ],
      componentArr: [
        {
          id: 112,
          type: "col",
          name: "line_bar",
          componentPath: "components/HelloWorld",
          size: 6,
          props: {
            title: "日异常统计",
            height: 200,
            width: "100%",
          },
        },
        {
          id: 131,
          type: "col",
          name: "自定义组件",
          componentPath: "components/HelloWorld",
          size: 6,
          props: {
            title: "日异常统计",
            height: 180,
            width: "100%",
          },
        },
      ],
      disabled: false,
    };
  },
};
</script>
<style lang='less'>
</style>