const productos = [
  {
    id: 1,
    nombre: "Arroz Doble",
    precio: 240,
    img: "./img/arroz-doble.jpg",
    cantidad: 1
  },
  {
    id: 2,
    nombre: "Fideo Mostachol",
    precio: 200,
    img: "./img/fideos-mostachol.jpg",
    cantidad: 1
  },
  {
    id: 3,
    nombre: "Fideos Nido",
    precio: 210,
    img: "./img/fideos-nido.jpg",
    cantidad: 1
  },
  {
    id: 4,
    nombre: "Fideos Rigatti",
    precio: 180,
    img: "./img/fideos-rigati.jpg",
    cantidad: 1
  },
  {
    id: 5,
    nombre: "Fideos Spaguetti",
    precio: 220,
    img: "./img/fideos-spaguetti.jpg",
    cantidad: 1
  },
  {
    id: 6,
    nombre: "Fideos Tallarin",
    precio: 240,
    img: "./img/fideos-tallarin.jpg",
    cantidad: 1
  },
  {
    id: 7,
    nombre: "Fideos Tirabuzon",
    precio: 250,
    img: "./img/fideos-tirabuzon.jpg",
    cantidad: 1
  },
  {
    id: 8,
    nombre: "Jugo de Limon",
    precio: 190,
    img: "./img/jugo-limon.jpg",
    cantidad: 1
  },
  {
    id: 9,
    nombre: "Mayonesa",
    precio: 340,
    img: "./img/mayonesa.jpg",
    cantidad: 1
  },
  {
    id: 10,
    nombre: "Pure de Tomate",
    precio: 300,
    img: "./img/pure-tomate.jpg",
    cantidad: 1
  },
  {
    id: 11,
    nombre: "Vinagre de Alcohol",
    precio: 180,
    img: "./img/vinagre-alcohol.jpg",
    cantidad: 1
  },
  {
    id: 12,
    nombre: "Vinagre de Manzana",
    precio: 180,
    img: "./img/vinagre-manzana.jpg",
    cantidad: 1
  },
  {
    id: 13,
    nombre: "Vinagre de Vino",
    precio: 300,
    img: "./img/vinagre-vino.jpg",
    cantidad: 1
  },
  {
    id: 14,
    nombre: "Yerba de Limon",
    precio: 880,
    img: "./img/yerba-limon.jpg",
    cantidad: 1
  }
];

let carrito = [];

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

let contenedorProductos = document.getElementById("card-container");

// FUNCIONES

const mostrarProducto = () => {
  productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${producto.img}" alt="Imagen del producto">
      <h2>${producto.nombre}</h2>
      <p class="price">$${producto.precio}</p>
      <button id="btn${producto.id}">Añadir al carrito</button>
    `
    contenedorProductos.appendChild(card);

    const btn = document.getElementById(`btn${producto.id}`);
    btn.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
    })
  })
};

mostrarProducto();

const agregarAlCarrito = (id) => {
  const productoCarrito = carrito.find(producto => producto.id === id);
  if (productoCarrito) {
    productoCarrito.cantidad++;
    dibujarCarrito();
  } else {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
    dibujarCarrito();
  }
  calcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorProductosCarrito = document.getElementById('shopping-cart');

const dibujarCarrito = () => {
  contenedorProductosCarrito.innerHTML = "";
  carrito.forEach(productoC => {
    const shoppingCard = document.createElement('div');
    shoppingCard.classList.add('shopping-cart-card');
    shoppingCard.innerHTML = `
    <div class="shopping-cart-card-img">
      <img src="${productoC.img}" alt="Nombre del producto">
    </div>
    <div class="shopping-cart-card-details">
      <h2 class="shopping-cart-card-title">${productoC.nombre}</h2>
      <div class="shopping-cart-card-price-qty">
        <p class="shopping-cart-card-price">$${productoC.precio}</p>
        <p class="shopping-cart-card-qty">Cantidad: ${productoC.cantidad}</p>
        <button id="eliminar-btn${productoC.id}" class="shopping-cart-btn">X</button>
      </div>
    </div>
    `
    contenedorProductosCarrito.appendChild(shoppingCard);

    const btn = document.getElementById(`eliminar-btn${productoC.id}`);

    btn.addEventListener('click', () => {
      eliminarDelCarrito(productoC.id);
    })
  })
  calcularTotal()
}

const eliminarDelCarrito = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  const index = carrito.indexOf(producto);
  carrito.splice(index, 1);
  dibujarCarrito();
  calcularTotal()
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciar = document.getElementById('vaciar');

vaciar.addEventListener('click', () => {
  vaciarCarrito();
})

const vaciarCarrito = () => {
  carrito = [];
  dibujarCarrito()
  calcularTotal()
  localStorage.clear();
  Swal.fire({
    title: 'Se vacio el carrito :(',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
}

const total = document.getElementById('total');

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  total.innerHTML = `$${totalCompra}`;
}

const recuperar = document.getElementById('recuperar');

recuperar.addEventListener('click', () => {
  contenedorProductosCarrito.innerHTML = "";
  setTimeout(() => {
    carrito.forEach(productoC => {
      const shoppingCard = document.createElement('div');
      shoppingCard.classList.add('shopping-cart-card');
      shoppingCard.innerHTML = `
      <div class="shopping-cart-card-img">
        <img src="${productoC.img}" alt="Nombre del producto">
      </div>
      <div class="shopping-cart-card-details">
        <h2 class="shopping-cart-card-title">${productoC.nombre}</h2>
        <div class="shopping-cart-card-price-qty">
          <p class="shopping-cart-card-price">$${productoC.precio}</p>
          <p class="shopping-cart-card-qty">Cantidad: ${productoC.cantidad}</p>
          <button id="eliminar-btn${productoC.id}" class="shopping-cart-btn">X</button>
        </div>
      </div>
      `;
      contenedorProductosCarrito.appendChild(shoppingCard);

      const btn = document.getElementById(`eliminar-btn${productoC.id}`);

      btn.addEventListener('click', () => {
        eliminarDelCarrito(productoC.id);
      })
    })
    calcularTotal()
    Swal.fire({
      title: 'Carrito recuperado :)',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  }, 2000);
});


const comprar = document.getElementById('comprar');

comprar.addEventListener('click', async () => {
  Swal.fire({
    title: 'Procesando Compra',
  });

  const promesaCompra = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (carrito.length > 0) {
        resolve({
          title: '¡Compra Realizada!',
          text: 'Gracias por su compra. Enviaremos su pedido al domicilio indicado.',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      } else {
        reject({
          title: 'El carrito se encuentra vacio',
          text: 'No puede realizar una compra sin productos añadidos al carrito',
          icon: 'warning',
          confirmButtonText: 'Cool'
        });
      }
    }, 2000);
  });

  promesaCompra
    .then(result => Swal.fire(result))
    .catch(error => Swal.fire(error));
});

const pasar = document.getElementById('pasar');

pasar.addEventListener('click', () => {
  let carro = JSON.parse(localStorage.getItem("carrito"));
  let totalCompra = 0;
  carro.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })

  const referencia = "http://127.0.0.1:5000/precio_blue"

  fetch(referencia)
    .then(respuesta => respuesta.json())
    .then((datos) => {
      let datoParseado = parseFloat(datos);
      conversionDolar(datoParseado, totalCompra);
    })
    .catch(error => {
      Swal.fire({
        title: 'Error al obtener los datos',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })
})

function conversionDolar(datos, total) {
  let conversion = total / datos;
  let arreglo = conversion.toFixed(2);
  Swal.fire({
    title: 'Conversion',
    text: `El equivalente en dolar es:${arreglo}`,
    icon: 'success',
    confirmButtonText: 'Cool'
  })
}
