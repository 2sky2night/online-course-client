/** 全局错误响应 */
export interface ResponseError {
  code: number;
  msg: string;
  timestamp: number;
  path: string;
  method: string;
}
