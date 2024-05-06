import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import type { VideoJsPlayer } from "video.js/index";

import { VIDEO_BASE_URL } from "@/constants";

import { Panel, Screen } from "./components";
import { Props, VideoQuality } from "./types";

/**
 * 视频播放器（只能播放内部的视频!）
 * 1.进度条双向联动
 * 2.暂停/播放
 * 3.控制栏的出入场动效 // TODO 显示逻辑需要更换，当前是只要鼠标在视频画布上就会显示，应该改为进入显示几秒钟，
 * 4.时间轴显示
 * 5.音量调节
 * 6.全屏（元素全屏）
 * 7.画质切换
 * 8. // TODO 视频播放速率
 * 9.点击面板可以暂停和播放视频
 * 10.// TODO 集成媒体控制
 * 11.// TODO 视频换源时的加载态
 * 12. // TODO 暴露api，来控制视频的播放、进度等，还需要暴露一些视频相关的事件，暂停/播放等
 */
export function VideoPlayer({
  sources,
  onExitFullScreenError,
  onFullScreenError,
  rawI18n = "",
  height,
  width,
}: Props) {
  /**
   * @name 当前选择的画质
   */
  const [activeType, setType] = useState(() => {
    return sources[0].type; // 默认选择第一个画质
  });
  /**
   * @name 当前选择的url
   */
  const activeUrl = useMemo(() => {
    return sources.find(item => item.type === activeType)!.url;
  }, [activeType]);
  // 对source进行排序，从高到低
  const formatSource = useMemo(() => {
    const raw = sources.find(item => item.type === null);
    const list = sources.filter(item => {
      return item.type !== null;
    });
    list.sort((a, b) => (b.type as number) - (a.type as number));
    if (raw) {
      list.unshift(raw);
    }
    return list;
  }, [sources]);
  // 当前播放视频的秒数
  const [currentTime, setCurrentTime] = useState(0);
  // 当前视频的总时长
  const [duration, setDuration] = useState(0);
  // 是否暂停了视频
  const [isPause, setPause] = useState(true);
  // 当前视频的音量
  const [volume, setVolume] = useState(1);
  // 是否全屏了
  const [isFull, setIsFull] = useState(false);
  // 此组件的根dom
  const rootRef = useRef<HTMLDivElement | null>(null);
  // 播放器样式
  const style = useMemo(() => {
    const setting: CSSProperties = {
      position: "relative",
      display: "flex",
      alignItems: "center",
    };
    if (height) setting.height = height;
    if (width) setting.width = width;

    return setting;
  }, [height, width]);
  /**
   * @name 播放器实例
   */
  const playerRef = useRef<VideoJsPlayer | null>(null);
  /**
   * 更新选择画质类型的实例
   */
  const handleChangeType = (value: VideoQuality | null) => {
    setType(value);
  };
  /**
   * 时间更新的回调
   */
  const handleCurrentTimeChange = (value: number) => {
    playerRef.current?.currentTime(value);
  };
  /**
   * 点击暂停或播放视频
   */
  const handleTogglePause = (value: boolean) => {
    if (value) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
  };
  /**
   * 通过滑块更新音量
   */
  const handleVolumeChange = (value: number) => {
    playerRef.current?.volume(value);
  };
  /**
   * video.js初始化完成
   */
  const handlePlayerReady = (player: VideoJsPlayer) => {
    playerRef.current = player;
    // 播放进度更新
    player.on("timeupdate", () => {
      setCurrentTime(player.currentTime());
    });
    // 总时长更新
    player.on("durationchange", () => {
      setDuration(player.duration());
    });
    // 点击暂停
    player.on("pause", () => {
      setPause(true);
    });
    // 点击播放
    player.on("play", () => {
      setPause(false);
    });
    // 音量更新
    player.on("volumechange", () => {
      setVolume(player.volume());
    });
    // 调用了src函数设置视频源后的回调
    player.on("sourceset", () => {
      setPause(true);
    });
  };
  /**
   * 点击全屏/退出全屏的回调
   */
  const handleToggleFull = () => {
    if (rootRef.current) {
      const dom = rootRef.current;
      if (isFull) {
        // 退出全屏
        window.document
          .exitFullscreen()
          .then(() => {
            setIsFull(v => !v);
          })
          .catch(err => {
            if (onExitFullScreenError) {
              onExitFullScreenError(err);
            }
          });
      } else {
        // 请求全屏
        dom
          .requestFullscreen()
          .then(() => {
            setIsFull(v => !v);
          })
          .catch(err => {
            if (onFullScreenError) {
              onFullScreenError(err);
            }
          });
      }
    }
  };

  // 视频换源
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.src(VIDEO_BASE_URL + activeUrl);
    }
  }, [activeUrl]);

  return (
    <div
      style={style}
      ref={rootRef}>
      <Panel
        sources={formatSource}
        activeType={activeType}
        duration={duration}
        currentTime={currentTime}
        isPause={isPause}
        isFull={isFull}
        volume={volume}
        rawI18n={rawI18n}
        onChangeType={handleChangeType}
        onChangeTime={handleCurrentTimeChange}
        onTogglePause={handleTogglePause}
        onVolumeChange={handleVolumeChange}
        onToggleFull={handleToggleFull}
      />
      <Screen
        initUrl={activeUrl}
        onReady={handlePlayerReady}
      />
    </div>
  );
}
