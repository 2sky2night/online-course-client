/** 本机ip地址 */
export const LOCALHOST_IP = "192.168.161.91";

/** 前端服务器端口号 */
export const FRONTEND_PORT = "5173";

/** 第三方登录请求地址 */
export const OAuth_URL = {
  /** github第三方登录请求链接 */
  github: `https://github.com/login/oauth/authorize?client_id=ed626ce4c22ba6bb731d&redirect_uri=http://localhost:${FRONTEND_PORT}/oauth/github`,
  /** gitee第三方登录请求链接 */
  gitee: `https://gitee.com/oauth/authorize?client_id=61b9b924a7a34166adfd64861eb852230d3bc846056d768d969c8f7af6d01997&redirect_uri=http://localhost:${FRONTEND_PORT}/oauth/gitee&response_type=code`,
  /** 支付宝第三方登录请求链接(支付宝会跳地址不能是本地域名或127.0.0.1，所以只能设置为本机ip) */
  alipay: `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021004132674105&scope=auth_user&redirect_uri=http://${LOCALHOST_IP}:5173/oauth/alipay&state=init`,
};
