class Producto {
  constructor(id, nombre, detalle, imagen, precio = 0) {
    this.id = id;
    this.nombre = nombre;
    this.detalle = detalle;
    this.imagen = imagen;
    this.precio = precio;
  }
}

// Modelo de los productos
//defino el arreglo productos.
const productos = JSON.parse(localStorage.getItem("productos")) || [];

const cuerpoTabla = document.getElementById("cuerpoTabla");

//Va a tener todos los métodos de los modales que vienen de Bootstrap, con esta variable (que tiene todos los métodos) ya podemos abrir el modal
const myModal = new bootstrap.Modal(document.getElementById("updateModal"));

//Función para Abrir Modal
const abrirModal = (index) => {
  document.querySelector(".modal-body").innerHTML = " ";
  const formularioUpDate = document.createElement("form");

  const contenidoFormulario =
    /* HTML */
    `<div class="mb-3">
        <label class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombreUpdate"
          value="${productos[index].nombre}"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Detalle</label>
        <textarea class="form-control" id="detalleUpdate" rows="3">
${productos[index].detalle}</textarea
        >
      </div>
      <div class="d-flex justify-content-between mb-3">
        <div class="col me-2">
          <label class="form-label">URL de imagen</label>
          <input
            type="text"
            class="form-control"
            id="imagenUpdate"
            value="${productos[index].imagen}"
          />
        </div>
        <div class="col">
          <label class="form-label">Precio</label>
          <input
            type="number"
            class="form-control"
            id="precioUpdate"
            value="${productos[index].precio}"
          />
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button
          class="btn btn-warning"
          type="button"
          onclick="actualizarProducto(${index})"
        >
          Actualizar
        </button>
      </div> `;
  formularioUpDate.innerHTML = contenidoFormulario;
  document.querySelector(".modal-body").append(formularioUpDate);

  myModal.show();
};

const crearProductos = (e) => {
  e.preventDefault();
  //crear id del producto
  const id = new Date().getTime();

  //traer los datos del formulario.
  const nombre = document.getElementById("nombreProd").value;
  const detalle = document.getElementById("detalleProd").value;
  const imagen = document.getElementById("imagenProd").value;
  const precio = document.getElementById("precioProd").value;

  //guardar esos datos en el arreglo productos y en LS.
  //crear un objeto con los datos
  /*const item = {
    id: id,
    nombre: nombre,
    detalle: detalle,
    imagen: imagen,
    precio: precio,
  };
  console.log(item);*/

  const item = new Producto(id, nombre, detalle, imagen, precio);

  //agregarlos al arreglo
  productos.push(item);
  localStorage.setItem("productos", JSON.stringify(productos));

  //limpiar el formulario para cargar otro producto.
  document.getElementById("formulario").reset();
  document.getElementById("nombreProd").focus();
  cargarTabla();
};

const borrarProducto = (index) => {
  let validar = confirm(
    `Está seguro que quiere borrar ${productos[index].nombre}` //Si doy aceptar da True, si doy cancelar da False.
  );

  if (validar) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarTabla();
  }
};

const actualizarProducto = (index) => {
  productos[index].nombre = querySelector("#nombreUpdate").value;
  productos[index].detalle = querySelector("#detalleUpdate").value;
  productos[index].imagen = querySelector("#imagenUpdate").value;
  productos[index].precio = querySelector("#precioUpdate").value;

  localStorage.setItem("productos", JSON.stringify(productos));
  cargarTabla();
  myModal.hide();
};

const cargarTabla = () => {
  cuerpoTabla.innerHTML = " ";
  //por cada elemento del arreglo producto crear una fila con las celdas.
  /*<tr>
    <th scope="row">id</th>
      <td>Nombre</td>
      <td>Detalle</td>
      <td>Precio</td>
    </tr>*/

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    const celdas =
      /* HTML */
      `
        <th scope="row">${producto.id}</th>
        <td>${producto.nombre}</td>
        <td>${producto.detalle}</td>
        <td>${producto.precio}</td>
        <td>
          <button class="btn btn-danger" onclick="borrarProducto(${index})">
            X
          </button>
          <button class="btn btn-warning" onclick="abrirModal(${index})">&#9998</button>
        </td>
      `;

    fila.innerHTML = celdas;

    //una vez que tengo esa fila con su contenido debo agregarlo al tbody
    cuerpoTabla.append(fila);
  });
};

document
  .getElementById("formulario")
  .addEventListener("submit", crearProductos); //clase 26/06 min 50
/* con el evento submit le mandamos a la función crearProductos el evento submit, se puede tomar el formulario del html 
  con el document.get... con el id poniendo el submit, no es necesario capturar el botón. */

cargarTabla();
