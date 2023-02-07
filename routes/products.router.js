import { Router } from "express";
import express from 'express';

import {ProductManager} from '../ProductManager.js'

const products = Router()

const items = new ProductManager('./productos.json')

products.use(express.json())
products.use(express.urlencoded({extended:true}))

/* La ruta raíz GET / deberá listar todos los productos de la base. */

products.get('/',(req,res) => {
    return res.send(items.getProducts())
})

/* La ruta GET /:pid deberá traer sólo el producto con el id proporcionado */

products.get('/:pid',(req,res)=>{
    let pid = req.params.pid
    let idPr = pid.substr(1,2)
    res.send(items.getProductsByID(Number(idPr)))
})

/* La ruta raíz POST / deberá agregar un nuevo producto con los campos */

products.post('/',(req,res) => {
    let item = req.body

    if(!item.title||!item.description||!item.code||!item.price||!item.status||!item.stock||!item.category||!item.thumbnail){
        return res.status(400).send({status:"Error",error:"Valores incorrectos o incompletos"})
    }else{
        items.addProduct(item.title.toString(),item.description.toString(),item.code.toString(),Number(item.price),Boolean(item.status),Number(item.stock),item.category.toString(),Array(item.thumbnail.toString()))
        return res.send({status:"OK",message:"Producto agregado correctamente"})
    }
})

products.put('/:pid',(req,res) =>{
    let pid = req.params.pid
    let idPr = Number(pid.substr(1,2))
    let item = req.body

    if(!item.title && !item.description && !item.code && !item.price && !item.status && !item.stock && !item.category && !item.thumbnail){
        return res.status(400).send({status:"Error", message:"Debe especificar al menos un campo a actualizar"})
    }else{
        if(item.title) items.updateProduct(idPr,"title",item.title)
        if(item.description) items.updateProduct(idPr,"description",item.description)
        if(item.code) items.updateProduct(idPr,"code",item.code)
        if(item.price) items.updateProduct(idPr,"price",item.price)
        if(item.status) items.updateProduct(idPr,"status",item.status)
        if(item.stock) items.updateProduct(idPr,"stock",item.stock)
        if(item.category) items.updateProduct(idPr,"category",item.category)
        if(item.thumbnail) items.updateProduct(idPr,"thumnails",item.thumbnail)

        return res.send({status:"OK", message:"Producto actualizado correctamente"})
    }
})

products.delete('/:pid',(req,res) => {
    let pid = req.params.pid
    let idPr = pid.substr(1,2)
    if(items.deleteProduct(Number(idPr))){
        return res.send({status:"OK", message:"Producto eliminado correctamente"})
    }else{
        return res.status(400).send({status:"Error", message:"No se pudo eliminar el producto"})
    }
})

export default products