## 全局样式
#### 使用gulp自动化构建工具，默认scss

```
npm run build 
```
编译成css文件

#### development环境
 `import '~/theme-default/src/index.scss';`
 >注意 需要开发环境有sass-loader处理

 #### producation环境
 `import '~/theme-default/lib/index.css';`