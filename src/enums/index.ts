/** pubsub事件类型 */
export enum MittEvent {
  /** 打开登录模态框 */
  OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL",
}

/** 页面路径 */
export enum Page {
  /** 首页 */
  INDEX = "/",
  /** 支付宝第三方登陆 */
  OAUTH_ALIPAY = "/oauth/alipay",
  /** gitee第三方登陆 */
  OAUTH_GITEE = "/oauth/gitee",
  /** github第三方登陆 */
  OAUTH_GITHUB = "/oauth/github",
}

/** zustand持久化存储key */
export enum ZustandKey {
  /** 用户 */
  USER = "user-store",
  /** 设置 */
  SETTING = "setting-store",
}
