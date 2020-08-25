import {Container,Box} from './components'


// 为组件提供 install 安装方法，供按需引入
Container.install = function (Vue) {
    Vue.component(Container.name, Container)
}
Box.install = function (Vue) {
    Vue.component(Box.name, Box)
}
// 默认导出组件
export {Container,Box} 