// 导入组件，组件必须声明 name
import elCurdLayout from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
elCurdLayout.install = function (Vue) {
    Vue.component(elCurdLayout.name, elCurdLayout)

}

// 默认导出组件
export default elCurdLayout