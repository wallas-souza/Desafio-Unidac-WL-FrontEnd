import { Cafe } from "./cafe"

export interface Colaborador {
  _id: string;
  nome: string;
  cpf: string;
  cafes: Cafe[];
}
