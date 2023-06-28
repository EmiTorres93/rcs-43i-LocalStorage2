// Modelo de los productos
//defino el arreglo productos.
const productos = JSON.parse(localStorage.getItem("productos")) || [];

const cuerpoTabla = document.getElementById("cuerpoTabla");

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
  const item = {
    id: id,
    nombre: nombre,
    detalle: detalle,
    imagen: imagen,
    precio: precio,
  };
  console.log(item);

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
          <button class="btn btn-warning">Edit</button>
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
