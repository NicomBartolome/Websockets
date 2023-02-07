import express, { application } from 'express'
import handlebars from 'express-handlebars'
import products from './routes/products.router.js'
import carts from './routes/carts.router.js'
import viewRouter from './routes/views.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import { ProductManager } from './ProductManager.js'

const srv = express()
const httpServer = srv.listen(8080,()=>{return "OK"})
const SocketServer = new Server(httpServer)

srv.use('/api/products/', products)
srv.use('/api/carts/',carts)

srv.engine('handlebars',handlebars.engine())

srv.set('views',__dirname+'/views')

srv.set('view engine','handlebars')

srv.use(express.static(__dirname+'/public'))

SocketServer.on('connection',socket =>{
    console.log('Cliente conectado')
    let Ps = new ProductManager('productos.json')
    let Pss = Ps.getProducts()
    socket.emit('Realtime', Pss)
})

srv.use('/', viewRouter)