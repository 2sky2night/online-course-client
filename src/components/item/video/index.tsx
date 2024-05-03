import { useMemo } from "react";

import { Ellipsis, Image } from "@/components";
import type { Video } from "@/types";
import { formatDate, formatDuration } from "@/utils/tools";

import { useVideoStyles } from "./styles";

interface Props {
  video: Video;
}

// TODO 点击某一项跳转视频详情页
// TODO 播放量显示（需要后端支持）
/** 视频项组件 */
export function VideoItem({ video }: Props) {
  const { styles } = useVideoStyles();
  /** 时间 */
  const time = useMemo(() => {
    return formatDate(video.created_time);
  }, [video.created_time]);
  /** 时长 */
  const duration = useMemo(() => {
    return formatDuration(video.duration);
  }, [video.duration]);
  /** 点击视频的回调 */
  const handleGoVideo = () => {};

  return (
    <div className={styles.videoItem}>
      <div
        className={styles.videoCover}
        onClick={handleGoVideo}>
        <Image
          className={styles.videoCoverImg}
          src={video.video_cover}
        />
        <div className={styles.videoCoverMask}>
          <div className={styles.videoCoverBottom}>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      <Ellipsis
        lineClamp={2}
        style={{ margin: "5px 0", height: "42px", fontSize: "15px" }}>
        {video.video_name}
      </Ellipsis>
      <div className={styles.videoDesc}>
        <span className="mr-1">{video.publisher.account_name}</span>
        <span className="mr-1">·</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
