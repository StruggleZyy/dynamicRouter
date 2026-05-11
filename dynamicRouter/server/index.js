//1.引入依赖
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

// 引入路由模块
const { router: authRouter, authMiddleware } = require('./routes/auth')
const { router: menuRouter } = require('./routes/menu')

//2.创建实例
const app = new Koa()

//3.中间件配置
app.use(cors())
app.use(bodyParser())

//4.挂载路由
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

// 菜单路由需要认证中间件
app.use(authMiddleware)
app.use(menuRouter.routes())
app.use(menuRouter.allowedMethods())

//5.启动服务
app.listen(3000, () => {
    console.log('服务启动成功，端口：3000')
})
