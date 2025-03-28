export interface IUser {
  id: number;
  name?: string;
  lastName?: string;
  nickName?: string;
  email?: string;
  password?: string;
  dateBirth?: Date | null;
  phone?: string;
  favoritePokemon?: string;
}

export interface IPokemon {
    name: string;
    url: string;
  }

export const initialUser: IUser = {
  id: 0,
  name: "",
  lastName: "",
  nickName: "",
  email: "",
  password: "",
  dateBirth: null,
  phone: "",
};
