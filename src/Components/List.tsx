import { useEffect, useState } from "react";
import { IProducto } from "../Interfaces/IProducto";
import { appsetings } from "../Settings/Settings";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export function List() {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProductos, setFilteredProductos] = useState<IProducto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage] = useState(5);
  const navigate = useNavigate();

  const getProductos = async () => {
    const response = await fetch(`${appsetings.apiUrl}Productos/List`);
    if (response.ok) {
      const data = await response.json();
      setProductos(data);
    }
  };

  const deleteProduto = (id: number) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Eliminar Producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `${appsetings.apiUrl}Productos/Delete/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) await getProductos();
      }
    });
  };

  const handleSearch = () => {
    const filtered = productos.filter(
      (item) =>
        item.nombre && item.nombre.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProductos(filtered);
  };

  // Función para obtener los productos de la página actual
  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * productsPage;
    const endIndex = startIndex + productsPage;
    return filteredProductos.slice(startIndex, endIndex);
  };

  // Cambiar la página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(productos.length / productsPage)) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    setFilteredProductos(productos);
  }, [productos]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Lista de Productos</h1>
      <h5>Producto:</h5>
      <div className="d-flex align-items-center mb-4 mt-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar Producto"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary ms-3" onClick={handleSearch}>
          Buscar
        </button>
        <button
          className="btn btn-primary ms-3"
          onClick={() => navigate("/newProducto")}
        >
          Nuevo Producto
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Presentacion</th>
              <th>Unidad</th>
              <th>Categoria</th>
              <th>Laboratorio</th>
              <th>Proveedor</th>
              <th>P.Compra</th>
              <th>P.Venta</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {paginateProducts().map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.presentacion}</td>
                <td>{item.unidad}</td>
                <td>{item.categoria}</td>
                <td>{item.laboratorio}</td>
                <td>{item.proveedor}</td>
                <td>{item.precioCompra}</td>
                <td>{item.precioVenta}</td>
                <td className="d-flex flex-column align-items-stretch">
                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => navigate(`/updateProducto/${item.id}`)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteProduto(item.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(productos.length / productsPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
