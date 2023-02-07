import express from 'express'
import { ProductManager } from '../ProductManager.js'

const router = express.Router()

router.get('/',(req,res) =>{

    let Prs = new ProductManager('./productos.json')
    let Prts = Prs.getProducts()
 
    res.render('home', {Prts})

})

router.get('/realtimeproducts',(req,res) =>{
    res.render('realTimeProducts');
})

export default router