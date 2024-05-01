/** 在localstorage中管理token */
export class Token {
  static tokenKey = "token";
  /** 获取token */
  static getToken() {
    return globalThis.localStorage.getItem(Token.tokenKey);
  }
  /**
   * 设置token
   * @param token token
   */
  static setToken(token: string) {
    globalThis.localStorage.setItem(Token.tokenKey, token);
  }
  /** 移除token */
  static removeToken() {
    globalThis.localStorage.removeItem(Token.tokenKey);
  }
}
