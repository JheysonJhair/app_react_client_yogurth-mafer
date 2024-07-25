export interface User {
  IdUser?: any;
  FirstName: string;
  LastName: string;
  Dni: string;
  Address?: string;
  Phone?: string;
  Mail?: string;
  Rol: number;
  Password?: string;
  BirthDate?: string;
}

export interface ErrorMessages {
  IdUser?: number;
  FirstName: string;
  LastName: string;
  Dni: string;
  Address?: string;
  Phone?: string;
  Mail?: string;
  Rol: number;
  Password?: string;
  BirthDate?: string;
}

export interface Login {
  UserRequest: string;
  Password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
