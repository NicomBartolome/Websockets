import fs from 'fs'

export class ProductManager{

    constructor(path){
        this.path = path

        if(fs.existsSync(this.path)){
            this.productos = JSON.parse(fs.readFileSync(this.path,"utf-8"))
        }else{
            fs.writeFileSync(this.path,JSON.stringify([]))
            this.productos = []
        }
    }

    GenID = () => {
        if(this.productos.length > 0){
            this.productos.id = this.productos.length + 1
        }else{
            this.productos.id = 1
        }

        return this.productos.id
    }

    addProduct = (title,description,code,price,status,stock,category,thumbnail) => {
        const NewItem = {
            id:this.GenID(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        };

        if(this.productos.find(codigo => codigo.code == code)){
            return "ERROR: El producto ya existe"
        }else{
            this.productos.push(NewItem)
            fs.writeFileSync(this.path,JSON.stringify(this.productos,null,3))
            console.log("OK: Producto agregado correctamente")
        }
    }

    getProducts = () => {
        return this.productos
    }

    getProductsByID = (id) => {
        if(this.productos.find(idBuscado => idBuscado.id === id)){
            return this.productos.find(idBuscado => idBuscado.id === id)
        }else{
            return "ID no encontrado"
        }
     }

     updateProduct = (id,campo,datos) => {
        if(fs.existsSync(this.path)){
            if(this.productos.find(idBuscado => idBuscado.id === id)){
                const Buscado = this.productos.find(idBuscado => idBuscado.id === id)
                Buscado[campo] = datos
                fs.writeFileSync(this.path,JSON.stringify(this.productos,null,3))
            }else{
                console.log("ID no encontrado")
            }
        }else{
            console.log("Archivo no encontrado")
            return "Archivo no encontrado"
        }
     }

     deleteProduct = (id) => {
        if(fs.existsSync(this.path)){
            if(this.productos.find(idBuscado => idBuscado.id === id)){
                const DelBuscado = this.productos.find(idBuscado => idBuscado.id === id)
                const Eliminado = this.productos.filter(Del => Del != DelBuscado)
                fs.writeFileSync(this.path,JSON.stringify(Eliminado,null,3))
                return true
            }else{
                console.log("ID no encontrado")
            }
        }else{
            console.log("Archivo no encontrado")
            return "Archivo no encontrado"
        }
     }
}

