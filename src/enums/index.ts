/** pubsub事件类型 */
export enum MittEvent {
  /** 打开登录模态框 */
  OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL",
}

/** 页面路径 */
export enum Page {
  /** 首页 */
  Index = "/",
  /** 支付宝第三方登陆 */
  OAuthAlipay = "/oauth/alipay",
  /** gitee第三方登陆 */
  OAuthGitee = "/oauth/gitee",
  /** github第三方登陆 */
  OAuthGithub = "/oauth/github",
}
