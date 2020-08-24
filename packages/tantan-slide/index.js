// 导入组件，组件必须声明 name
import stackSlide from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
stackSlide.install = function (Vue) {
    Vue.component(stackSlide.name, stackSlide)

}

// 默认导出组件
export default stackSlide