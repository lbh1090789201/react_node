该架构基于react+react-router+react-redux+antd+express+webpack+es6+mysql+jquery(插件扩展)+scss技术，后期会引入nginx作为处理静态资源和反向代理。该框架目前还处于最基本的实现功能，主要有前端模块化，工程化功能，和热更新功能。后续优化中...

1. 架构目录说明
- bin文件夹 node的启动文件
- dist文件夹 前端页面经过webpack打包的存放目录
- public文件夹 前端开发目录
-   component文件夹 react组件/redux存放目录
-       actions文件夹 用于定义action和生成store
-       modules文件夹 用于创建复用性组件
-       pages文件夹  用于创建页面组件
-       index.jsx文件  react入口文件
-   css文件夹 样式文件
-   images文件夹 图片文件
-   js文件夹 jquery扩展或自定义脚本
-   plugins文件夹 外部插件
-   templates文件夹 html文件
-   configuration文件  用于设置变量/常量
- routes文件夹 node处理路由目录
- service文件夹 node的业务逻辑目录
- tmp文件夹 上传文件存放目录
- app.js express的配置文件

2. 克隆项目
	git clone git@github.com:lbh1090789201/react_node.git

3. 项目运行
	(cnpm)npm install
	(cnpm)npm run dev
	(cnpm)npm run start

4. 打开项目
http://127.0.0.1:3000

5. 本次更新内容:
	1).增加store中的状态分支common, 用于处理组件跳转涉及的参数。
	2).完善基于jquery扩展的方法，新增cookie/sessionStorage/localStorage的增删查改。
	3).增加车票模块页面，已实现组件交互，缺少接口交互(由于需要整理api，后续耗时相对多点)(页面模拟智行，但又不完全一致)
	4).去除本地mysql连接。
	5).引入antd。
6.	下次更新内容(由于本人是利用业余时间开发，故进程稍微慢点，请见谅)
	1).去除mysql连接(基于练习项目，暂不存在mysql，启用本地数据库，不适合后期拓展，后期数据统一从第三方获取)
	2).继续开发车票模块系统。
