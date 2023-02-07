import { Router } from 'express';
import express from 'express';

import {Carrito} from '../Carrito.js';

const carts = Router()

const CarritoCompra = new Carrito('carrito.json')

carts.use(express.json())
carts.use(express.urlencoded({extended:true}))

carts.post('/',(req,res) => {
    if(CarritoCompra.addCart()){
        return res.send({status:"OK",message:"Carrito creado correctamente"})
    }else{
        return res.status(400).send({status:"Error", message:"No se pudo crear el carrito"})
    }
})

carts.get('/:cid',(req,res) => {
    let cid = req.params.cid
    let idCr = Number(cid.substr(1,2))
    console.log(idCr)
    if(!cid){
        return res.status(400).send({status:"Error", message:"Por favor especifique el ID del carrito"})
    }else{
        res.send(CarritoCompra.getCartByID(idCr))
    }

})

carts.post('/:cid/product/:pid', (req,res) =>{
    let cid = req.params.cid
    let idCr = Number(cid.substr(1,2))

    let pid = req.params.pid
    let idPr = Number(pid.substr(1,2))

    if(!cid || !pid){
        res.status(400).send({status:"Error", message:"Faltan datos para cumplir la operacion"})
    }else{
        CarritoCompra.addItem(idCr,idPr)
        return res.send({status:"OK", message:"Se agrego el producto correctamente"})
    }
})

export default carts