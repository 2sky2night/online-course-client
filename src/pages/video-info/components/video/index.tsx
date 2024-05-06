import { LikeBtn, VideoPlayer } from "@/components";
import { VideoInfo } from "@/types";

import { Info } from "..";
import { useVideoStyles } from "./styles";

interface Props {
  video: VideoInfo;
}

export function Video({ video }: Props) {
  const { styles } = useVideoStyles();
  return (
    <div className="my-3">
      <div>
        <VideoPlayer
          sources={video.source.map(item => {
            return {
              type: item.resolution,
              url: item.file_path,
            };
          })}
        />
        <div className={styles.playerBottom}>
          <div>
            <LikeBtn.Video
              vid={video.video_id}
              count={video.count.likes}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <Info video={video} />
      </div>
    </div>
  );
}
