import { cookie } from "./cookie";

export const ACCESS_TOKEN_KEY = "access-token" as const;
export const REFRESH_TOKEN_KEY = "refresh-token" as const;
export const REQUEST_TOKEN_KEY = "Authorization" as const;

class Token {
  public getToken(key: string): string | undefined {
    return cookie.getCookie(key);
  }

  public setToken(key: string, value: string): void {
    cookie.setCookie(key, value);
  }

  public clearToken(): void {
    cookie.removeCookie(ACCESS_TOKEN_KEY);
    cookie.removeCookie(REFRESH_TOKEN_KEY);
  }
}

export const token = new Token();
