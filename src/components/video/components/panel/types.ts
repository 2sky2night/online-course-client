import { VideoQuality, VideoSrouce } from "../../types";

export interface Props {
  /**
   * 视频源信息
   */
  sources: VideoSrouce[];
  /**
   * 当前正在播放的type
   */
  activeType: VideoQuality | null;
  /**
   * 当前播放的时间 秒
   */
  currentTime: number;
  /**
   * 当前视频的总时长 秒
   */
  duration: number;
  /**
   * 是否暂停了视频
   */
  isPause: boolean;
  /**
   * 当前音量大小
   */
  volume: number;
  /**
   * 是否全屏
   */
  isFull: boolean;
  /**
   * 原画文本的国际化
   */
  rawI18n: string;
  /**
   * 拖动进度条的回调
   */
  onChangeTime: (value: number) => void;
  /**
   * 选择的画质类型更新的回调
   */
  onChangeType: (value: VideoQuality | null) => void;
  /**
   * 暂停或播放了视频
   */
  onTogglePause: (value: boolean) => void;
  /**
   * 音量更新的回调
   */
  onVolumeChange: (value: number) => void;
  /**
   * 切换全屏的回调
   */
  onToggleFull: () => void;
}

/**
 * 音量大小映射
 */
export enum VolumeValue {
  MAX = 100,
  HIGHT = 60,
  LOW = 30,
  NO = 0,
}
