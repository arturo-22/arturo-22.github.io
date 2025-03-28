export interface IUser {
  id: number;
  idPokemon?: number;
  name?: string;
  lastName?: string;
  nickName?: string;
  email?: string;
  password?: string;
  dateBirth?: Date | null;
  phone?: string;
  favoritePokemonName?: string;
  favoritePokemonImg?: string;
}

export const initialUser: IUser = {
  id: 0,
  idPokemon: 0,
  name: "",
  lastName: "",
  nickName: "",
  email: "",
  password: "",
  dateBirth: null,
  phone: "",
  favoritePokemonName: "",
  favoritePokemonImg: "",
};
