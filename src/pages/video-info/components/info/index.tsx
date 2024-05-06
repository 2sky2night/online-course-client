import {
  CommentOutlined as CommentIcon,
  PlayCircleOutlined as PlayIcon,
} from "@ant-design/icons";
import { Space } from "antd";
import { useMemo } from "react";

import { Ellipsis } from "@/components";
import type { VideoInfo } from "@/types";
import { formatDate } from "@/utils/tools";

import { useVideoInfoStyles } from "./styles";

interface Props {
  video: VideoInfo;
}

export function Info({ video }: Props) {
  const { styles } = useVideoInfoStyles();
  const createdTime = useMemo(() => {
    if (video.created_time) {
      return formatDate(video.created_time);
    } else {
      return "";
    }
  }, [video.created_time]);

  return (
    <div className="flex flex-col">
      <Ellipsis className={styles.title}>{video.video_name}</Ellipsis>
      <Ellipsis
        lineClamp={2}
        className={styles.subTitle}>
        {video.description}
      </Ellipsis>
      <Space className={`${styles.subTitle} px-2 my-1 md:my-2`}>
        <div>
          <PlayIcon />
          <span className="ml-1">{video.count.views}</span>
        </div>
        <div>
          <CommentIcon />
          <span className="ml-1">{video.count.comments}</span>
        </div>
        <div>
          <span>{createdTime}</span>
        </div>
      </Space>
    </div>
  );
}
