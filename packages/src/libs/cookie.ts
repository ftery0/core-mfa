import jsCookie from "js-cookie";

class Cookie {
  public getCookie(key: string): string | undefined {
    let item = undefined;
    if (jsCookie.get(key) !== undefined) {
      item = jsCookie.get(key);
    }
    return item;
  }

  public setCookie(key: string, value: string): void {
    jsCookie.set(key, value);
  }

  public removeCookie(key: string): void {
    jsCookie.remove(key);
  }
}

export const cookie = new Cookie();
