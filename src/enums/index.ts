/** pubsub事件类型 */
export enum MittEvent {
  /** 打开登录模态框 */
  OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL",
  /** main组件滚动条触底了(在此订阅的回调中千万不要使用state，因为作用域问题只能获取旧的state) */
  MAIN_IS_BOTTOM_DOWN = "MAIN_IS_BOTTOM_DOWN",
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
