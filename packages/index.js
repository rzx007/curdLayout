// 整合所有的组件，对外导出，即一个完整的组件库
// 修改 此 文件，对整个组件库进行导出。
// 导入组件
import colorPicker from './color-picker'
import curdLayout from './curd-layout'
import elButton from './button'
import elCurdLayout from './el-curd-layout'
import stackSlide from './tantan-slide'
import dynamicComponent from './DynamicComponents'
import LineBar from './line-bar'
// 存储组件列表
const components = [
    colorPicker,
    curdLayout,
    elButton,
    elCurdLayout,
    stackSlide, 
    LineBar,
     dynamicComponent
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: '0,0,1',
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // 以下是具体的组件列表
    colorPicker,
    curdLayout,
    elButton,
    elCurdLayout,
    stackSlide,
    LineBar,
    dynamicComponent
}

// 参考 

// https://www.cnblogs.com/dongwei1/p/13285281.html?utm_source=tuicool