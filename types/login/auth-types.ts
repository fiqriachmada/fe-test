export interface AuthState {
  user: Partial<User> | null;
  setAuth: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: Partial<User>;
  }) => void;
  reset: () => void;

  isAuthenticated: boolean;
}

export interface RootAuth {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  address: any;
  phoneNumber: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  roles: Role[];
  province: Province;
  city: City;
  district: District;
  subdistrict: Subdistrict;
}

export interface Role {
  id: string;
  roleName: string;
}

export interface Province {
  provinceCode: number;
  provinceName: string;
}

export interface City {
  cityCode: number;
  cityName: string;
  provinceCode: number;
}

export interface District {
  districtCode: number;
  districtName: string;
  cityCode: number;
}

export interface Subdistrict {
  subdistrictCode: number;
  subdistrictName: string;
  districtCode: number;
}
