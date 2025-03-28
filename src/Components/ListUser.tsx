import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IUser } from "../Interfaces/IUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const ListUser = () => {
  // Usamos hook useLocalStorage
  const [users, setUsers] = useLocalStorage<IUser[]>("users-app", []);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();

  // Inicializar filteredUsers con los usuarios existentes
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // Eliminar usuario
  const deleteUser = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };

  // Buscar usuarios
  const handleSearch = () => {
    const searchTerm = search.toLowerCase();
    const filtered = users.filter((item) => {
      return (
        (item.name && item.name.toLowerCase().includes(searchTerm)) ||
        (item.lastName && item.lastName.toLowerCase().includes(searchTerm)) ||
        (item.nickName && item.nickName.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredUsers(filtered);
  };

  // Paginación
  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  };

  // Efecto para manejar búsqueda
  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="container mt-5 ali">
      <h1 className="text-center mb-5">Lista de Usuarios</h1>
      <div className="d-flex align-items-center mb-4 mt-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar por nombre, apellido y apodo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary ms-3"
          onClick={() => navigate("/newUser")}
        >
          Nuevo Usuario
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="alert alert-info mt-4">
          No hay usuarios registrados. Haz clic en "Nuevo Usuario" para agregar
          uno.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover text-center">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Apodo</th>
                  <th>Correo Electronico</th>
                  <th>Password</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Teléfono</th>
                  <th>Pokémon Favorito</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginateUsers().map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.nickName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      {user.dateBirth
                        ? new Date(user.dateBirth).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.favoritePokemon || "-"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2 mb-2 mb-sm-0"
                        onClick={() => navigate(`/updateUser/${user.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length > usersPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListUser;
