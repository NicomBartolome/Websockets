const socket = io()

let lista = document.getElementById('Lista-Productos')

socket.on('Realtime',data => {
    console.log(data)
    let listaCompleta = data.map((data) =>
        `<li> ID: ${data.id} | Producto: ${data.title} | Precio: ${data.price} | Stock disponible: ${data.stock}</li>`
    ).join(" ")
    lista.innerHTML = listaCompleta
})