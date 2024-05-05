import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Ellipsis, Image } from "@/components";
import { Page } from "@/enums";
import type { Video } from "@/types";
import { formatDate, formatDuration } from "@/utils/tools";

import { useVideoStyles } from "./styles";

interface Props {
  video: Video;
}

// TODO 播放量显示（需要后端支持）
// TODO 评论显示量（需要后端支持）
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

  return (
    <div className={styles.videoItem}>
      <div className={styles.videoCover}>
        <Link to={`${Page.VIDEO_INFO}/${video.video_id}`}>
          <Image
            className={styles.videoCoverImg}
            src={video.video_cover}
          />
          <div className={styles.videoCoverMask}>
            <div className={styles.videoCoverBottom}>
              <span>{duration}</span>
            </div>
          </div>
        </Link>
      </div>
      <Ellipsis lineClamp={2}>
        <Link
          to={`${Page.VIDEO_INFO}/${video.video_id}`}
          className={styles.videoTitle}>
          {video.video_name}
        </Link>
      </Ellipsis>
      <div className={styles.videoDesc}>
        <span className="mr-1">{video.publisher.account_name}</span>
        <span className="mr-1">·</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
