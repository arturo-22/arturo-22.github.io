import { ChangeEvent, useState } from "react";
import { IProducto } from "../Interfaces/IProducto";
import { useNavigate } from "react-router-dom";
import { appsetings } from "../Settings/Settings";
import Swal from "sweetalert2";

const initialProducto = {
  id: 0,
  nombre: "",
  presentacion: "",
  unidad: "",
  categoria: "",
  laboratorio: "",
  proveedor: "",
  precioCompra: 0,
  precioVenta: 0,
};

const NewProducto = () => {
  const [producto, setProducto] = useState<IProducto>(initialProducto);
  const navigate = useNavigate();

  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value.toUpperCase();

    setProducto({ ...producto, [inputName]: inputValue });
  };

  const save = async () => {
    if (!producto.nombre || producto.nombre.trim() === "") {
      Swal.fire({
        title: "Error!",
        text: "El campo 'Nombre' no fue ingresado.",
        icon: "warning",
      });
      return;
    }

    const response = await fetch(`${appsetings.apiUrl}Productos/Create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (response.ok) {
      navigate("/");
    } else {
      Swal.fire({
        title: "Error!",
        text: "No se pudo guardar el producto",
        icon: "warning",
      });
    }
  };

  const returnHomePage = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Crear Nuevo Producto</h1>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                value={producto.nombre}
                onChange={inputChangeValue}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="presentacion" className="form-label">
                Presentación:
              </label>
              <input
                type="text"
                id="presentacion"
                name="presentacion"
                className="form-control"
                value={producto.presentacion}
                onChange={inputChangeValue}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="unidad" className="form-label">
                Unidad:
              </label>
              <input
                type="text"
                id="unidad"
                name="unidad"
                className="form-control"
                value={producto.unidad}
                onChange={inputChangeValue}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">
                Categoría:
              </label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                className="form-control"
                value={producto.categoria}
                onChange={inputChangeValue}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="laboratorio" className="form-label">
                Laboratorio:
              </label>
              <input
                type="text"
                id="laboratorio"
                name="laboratorio"
                className="form-control"
                value={producto.laboratorio}
                onChange={inputChangeValue}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="proveedor" className="form-label">
                Proveedor:
              </label>
              <input
                type="text"
                id="proveedor"
                name="proveedor"
                className="form-control"
                value={producto.proveedor}
                onChange={inputChangeValue}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="precioCompra" className="form-label">
                P.Compra:
              </label>
              <input
                type="number"
                id="precioCompra"
                name="precioCompra"
                className="form-control"
                value={producto.precioCompra}
                onChange={inputChangeValue}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="precioVenta" className="form-label">
                P.Venta:
              </label>
              <input
                type="number"
                id="precioVenta"
                name="precioVenta"
                className="form-control"
                value={producto.precioVenta}
                onChange={inputChangeValue}
                required
              />
            </div>

            <div className="mb-3">
              <button type="button" className="btn btn-primary w-100 w-sm-25 mb-2" onClick={save}>
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 w-sm-25"
                onClick={returnHomePage}
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProducto;
