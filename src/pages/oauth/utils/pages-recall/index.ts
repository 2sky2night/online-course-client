/** 页面会跳工具类 */
export class PagesRecall {
  static PagesRecallKey = "pages-recall";
  /**
   * 记录当前页面的路径
   * @param path
   */
  static setKey(path: string) {
    globalThis.localStorage.setItem(PagesRecall.PagesRecallKey, path);
  }
  /** 获取路径 */
  static getKey() {
    return globalThis.localStorage.getItem(PagesRecall.PagesRecallKey);
  }
  /** 移除页面记录 */
  static removeKey() {
    globalThis.localStorage.removeItem(PagesRecall.PagesRecallKey);
  }
}
