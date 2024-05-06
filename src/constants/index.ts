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

/** APP名称 */
export const APP_NAME = "微课视频网站";

/**
 * 检测是否为绝对路径的正则
 */
export const IS_ABSOLUTE_PATH = /^(?:\/|[a-zA-Z]:\\)/;

/**
 * 静态服务器请求路径
 */
export const STATIC_SERVER_URL = import.meta.env
  .VITE_STATIC_SERVER_URL as string;

/** 移动端(手机平板等)宽度 */
export const IS_MOBILE = 786;

/** 兜底的图片链接 */
export const DEFAULT_IMG = "/images/default.png";

/**
 * 视频播放的基地址
 */
export const VIDEO_BASE_URL = STATIC_SERVER_URL + "/video";
