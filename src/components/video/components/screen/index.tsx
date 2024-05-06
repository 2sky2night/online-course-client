import "video.js/dist/video-js.css";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import { VideoJsPlayer } from "video.js/index";

import { VIDEO_BASE_URL } from "@/constants";

interface Props {
  /**
   * 初始播放的视频链接
   */
  initUrl: string;
  /**
   * 实例初始化成功的回调
   */
  onReady: (player: VideoJsPlayer) => void;
}

/**
 * 视频播放的画布
 */
const Screen = ({ initUrl, onReady }: Props) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  // 初始化player实例
  useEffect(() => {
    const options = {
      responsive: true,
      fluid: true,
      sources: [
        {
          src: VIDEO_BASE_URL + initUrl,
        },
      ],
    };
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (onReady) {
          onReady(player);
        }
      }) as unknown as VideoJsPlayer);
    } else {
      const player = playerRef.current;
      player.src(options.sources);
    }
  }, [videoRef]);

  // 销毁player实例
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      style={{ flexGrow: 1 }}>
      <div ref={videoRef} />
    </div>
  );
};

export default Screen;
