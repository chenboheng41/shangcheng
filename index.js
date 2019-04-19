const express=require('express');
const bodyParser=require('body-parser');
// 引入路由模块
const userRouter=require('./router/user');
const index=require('./router/index.route');
const details=require('./router/details.route');
const category=require('./router/category.router');
//创建web服务器
var server=express();
//连接监听端口3001
server.listen(5050);

//托管静态资源到public目录下
server.use(express.static('public'));
//使用body-parser中间件将请求的数据解析为对象，写在路由器前边
server.use(bodyParser.urlencoded({
  extended:false
}));
//把用户路由器挂载到/product

//把用户路由器挂载到/user
server.use('/user',userRouter);
//使用路由器来管理路由
server.use("/index",index);
server.use("/details",details);
server.use("/category",category);

























