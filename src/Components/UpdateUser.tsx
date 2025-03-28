import { ChangeEvent, useEffect, useState } from "react";
import { IUser, initialUser } from "../Interfaces/IUser";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { useLocalStorage } from "usehooks-ts";

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useLocalStorage<IUser[]>("users-app", []);
  const [user, setUser] = useState<IUser>(initialUser);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const save = () => {
    // Validación
    if (!user.name || !user.email) {
      Swal.fire({
        title: "Error!",
        text: "Nombre y email son campos obligatorios",
        icon: "error",
      });
      return;
    }

    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));

    setUsers(updatedUsers);

    Swal.fire({
      title: "Éxito!",
      text: "Usuario actualizado correctamente",
      icon: "success",
    });

    navigate("/");
  };

  const returnHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const existingUser = users.find((u) => u.id === Number(id));
      if (existingUser) {
        setUser(existingUser);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Usuario no encontrado",
          icon: "error",
        }).then(() => navigate("/"));
      }
    }
  }, [id, users]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Actualizar Usuario</h1>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <form className="formUpdate">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={user.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Apellido:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={user.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nickname" className="form-label">
                Apodo:
              </label>
              <input
                type="text"
                id="nickname"
                name="nickName"
                className="form-control"
                value={user.nickName}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electronico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateBirth" className="form-label">
                Fecha de Nacimiento:
              </label>
              <DatePicker
                selected={user.dateBirth ? new Date(user.dateBirth) : null}
                onChange={(date) => setUser({ ...user, dateBirth: date })}
                dateFormat="dd/MM/yyyy"
                locale={es}
                placeholderText="dd/mm/yyyy"
                className="form-control p-2"
                wrapperClassName="w-100"
                id="dateBirth"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono:
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="form-control"
                value={user.phone || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="favoritePokemon" className="form-label">
                Pokémon Favorito:
              </label>
              <input
                type="text"
                id="favoritePokemon"
                name="favoritePokemon"
                className="form-control"
                value={user.favoritePokemon || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="d-flex gap-2 mt-4 mb-4">
              <button
                type="button"
                className="btn btn-primary flex-grow-1"
                onClick={save}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary flex-grow-1"
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

export default UpdateUser;
