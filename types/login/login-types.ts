export interface LoginState {
  username: string;
  password: string;
  timestamp: number | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  code: number;
  is_logged_in: number;
  token: string;
}

export interface DecodedToken {
  exp: number;
}

export interface ErrorLogin {
  message?: string;
  error?: string;
  statusCode?: number;
}
