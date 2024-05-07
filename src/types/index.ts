/** 全局错误响应 */
export interface ResponseError {
  code: number;
  msg: string;
  timestamp: number;
  path: string;
  method: string;
}

/** 用户基本信息 */
export type UserInfo = API.UserInfoDto;

/** 分区基本信息 */
export type Partition = API.PartitionInfoDto;

/** 视频基本信息 */
export type Video = API.RVideoListItemDto;

/** 视频合集基本信息 */
export type Collection = API.CollectionDtoA;

/** 视频详情信息 */
export type VideoInfo = API.RVideoInfoDto;

/** 评论列表项 */
export type Comment = API.CommentDtoA;

/** 回复项 */
export type Reply = API.ReplyDtoA;
