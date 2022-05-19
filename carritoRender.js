//Base datos -- simulada mediante un array o documento tipo json
const baseDato = [
    {
        id: 1,
        nombre: 'Agua Bonafont embotellada',
        precio: 11,
        imagen: "images/agua.jpg"
    },
    {
        id: 2,
        nombre: 'Chocokrispis',
        precio: 70,
        imagen: "images/cereal.jpg"
    },
    {
        id: 3,
        nombre: 'Jabón líquido',
        precio: 80,
        imagen: "images/detergente.png"
    },
    {
        id: 4,
        nombre: 'Bananas',
        precio: 20,
        imagen: "images/platanos.jpg"
    },
    {
        id: 5,
        nombre: 'Leche deslactosada',
        precio: 40,
        imagen: "images/leche.png"
    },
    {
        id: 6,
        nombre: 'Avena',
        precio: 15,
        imagen: "images/avena.jpg"
    },

]

let carrito = []
const domItems = document.querySelector('#item')
const domCarrito = document.querySelector('#carrito')
const domTotal = document.getElementById('total')
const domBotonVaciar = document.getElementById('botonVaciar')

function renderizarProductos() {
    baseDato.forEach((info) => {
        //Creamos la estructura del main 
        //creamos la card que es div un con class card

        const cardProducto = document.createElement('div')
        cardProducto.classList.add('card', 'col-sm-4')

        //Creamos el body de la card
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        //Creamos el titulo de la card
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = info.nombre

        //Creamos la imagen de la card
        const cardImage = document.createElement('img')
        cardImage.classList.add('img-fluid')
        cardImage.setAttribute('src', info.imagen)
        //cardImage.setAttribute('src', "images/agua.jpg")

        //creamos el elemento para el precio del producto
        const cardPrecio = document.createElement('p')
        cardPrecio.textContent = `$${info.precio}`

        //Crear el boton
        const btnAgregar = document.createElement('button')
        btnAgregar.textContent = "+"
        btnAgregar.classList.add('btn', 'btn-primary')
        btnAgregar.addEventListener('click', agregarProductoAlCarrito)
        btnAgregar.setAttribute('marcador', info.id)

        //Agregamos los elemetnos al contenedor main 
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardImage)
        cardBody.appendChild(cardPrecio)
        cardBody.appendChild(btnAgregar)
        cardProducto.appendChild(cardBody)
        domItems.appendChild(cardProducto)
    })
}


//Crear funcion para a�adir producto desde Array por medio id del producto
function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito()
}

//Crear funciones para dar funcionalidad a los botones de Agregar y Vaciar
function renderizarCarrito() {
    //vaciar carrito aunque no tenga nada
    domCarrito.textContent = ''
    //Aqui va haber mas linea de codigo para uso de base de datos
    const carritoNoDuplicados = [... new Set(carrito)]

    carritoNoDuplicados.forEach((item) => {
        const miItem = baseDato.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        })
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total
        }, 0)

        //creamos un li 
        const nuevoNodo = document.createElement('li')
        //creamos estilo
        nuevoNodo.classList.add('list-group-item', 'text-end')
        //Agreamos contenido
        nuevoNodo.textContent = `${miItem[0].nombre} x ${numeroUnidadesItem} - $${miItem[0].precio}`

        //Agregar boton para eliminar producto del carrito
        const btnEliminar = document.createElement('button')
        btnEliminar.classList.add('btn', 'btn-danger')
        btnEliminar.textContent = 'X'
        btnEliminar.dataset.item = item
        btnEliminar.addEventListener('click', eliminarProductoCarrito)

          //Hacemos appendChild de los elementos
    nuevoNodo.appendChild(btnEliminar)
        domCarrito.appendChild(nuevoNodo)
    })
    domTotal.textContent = calcularTotales()



}

//Crear funcion para vaciar el carrito
function vaciarCarrito() {
    //Esto unicamente limpia el contenido de la Ul
    domCarrito.textContent = ''
    //vaciamos el array carrito
    carrito = []
    renderizarCarrito()
}

//crear funcion para eliminar un solo producto del carrito (no del contador)
function eliminarProductoCarrito(evento) {
    const id = evento.target.dataset.item
    //eliminamos el producto del array 
    carrito = carrito.filter((carritoId) => {
        return carritoId != id
    })
    renderizarCarrito()
}

//funcion para calcular el total a pagar por todos los productos agregados al carrito
function calcularTotales() {
    //recorrer el carrito
    return carrito.reduce((total, item) => {
        const NewItem = baseDato.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item)
        })
        return total + NewItem[0].precio
    },0)
}


domBotonVaciar.addEventListener('click', vaciarCarrito)
renderizarProductos()