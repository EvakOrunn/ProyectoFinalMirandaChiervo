let listaPersonal = [];

fetch("https://jsonplaceholder.typicode.com/users")
    .then(respuesta => respuesta.json())
    .then((datos) => {
        mostrarPersonal(datos)
    })
    .catch(error => {
        Swal.fire({
            title: 'Error al obtener los datos',
            text: `${error}`,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    })

let contenedorPersonal = document.getElementById("personal-card-container");

function mostrarPersonal(datos) {
    datos.forEach(dato => {
        const card = document.createElement('div');
        card.classList.add('personal-card');
        card.innerHTML = `
      <img src="../img/personal-photo.png" alt="Imagen del producto">
      <p>${dato.name}</p>
      `
        contenedorPersonal.appendChild(card);
    })
};
