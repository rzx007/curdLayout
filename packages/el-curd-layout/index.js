// 导入组件，组件必须声明 name
import ElCurdLayout from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
ElCurdLayout.install = function (Vue) {
    Vue.component(ElCurdLayout.name, ElCurdLayout)

}

// 默认导出组件
export default ElCurdLayout