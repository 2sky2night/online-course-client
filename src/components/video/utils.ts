import { VideoQuality } from "./types";

/**
 * 格式化视频画质的文本
 */
export function formatQuality(value: VideoQuality | null, rawI18n: string) {
  if (value === null) {
    return rawI18n;
  } else {
    return `${value}P`;
  }
}
