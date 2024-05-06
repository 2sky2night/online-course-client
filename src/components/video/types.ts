/**
 * 视频分辨率
 */
export enum VideoQuality {
  /**
   * 320p
   */
  VERY_LOW = 320,
  /**
   * 480p
   */
  LOW = 480,
  /**
   * 720p
   */
  NORMAL = 720,
  /**
   * 1080p
   */
  HIGH = 1080,
}

export interface VideoSrouce {
  /**
   * 视频分辨率
   */
  type: VideoQuality | null;
  /**
   * 视频，提供绝对路径即可，会自动拼接
   */
  url: string;
}

/**
 * 视频播放器的props
 */
export interface Props {
  /**
   * 视频源信息
   */
  sources: VideoSrouce[];
  /**
   * 全屏失败的回调
   */
  onFullScreenError?: (err: unknown) => void;
  /**
   * 全屏失败的回调
   */
  onExitFullScreenError?: (err: unknown) => void;
  /**
   * 当画质类型为原画（null）的国际化
   */
  rawI18n?: string;
  /**
   * 画布高
   */
  height?: string;
  /**
   * 画布宽
   */
  width?: string;
}
