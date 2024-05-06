import { animated, useSpring } from "@react-spring/web";
import { Play as PlayIcon } from "@ricons/fa";
import {
  FullScreenMaximize16Filled as FullMaxIcon,
  FullScreenMinimize24Filled as FullMinIcon,
} from "@ricons/fluent";
import { Pause as PauseIcon } from "@ricons/ionicons5";
import { Icon } from "@ricons/utils";
import { Flex, Slider, Space } from "antd";
import type { MouseEvent } from "react";
import { useMemo } from "react";

import { formatTime } from "@/utils/tools";

import { VideoQuality } from "../../types";
import { formatQuality } from "../../utils";
import { QualityItem, SliderConfig, VolumeIcon } from "./components";
import { useStyle } from "./styles";
import { Props, VolumeValue } from "./types";

/**
 * 视频的面板（底部操作栏）
 */
export default function Panel({
  activeType,
  sources,
  isFull,
  rawI18n,
  currentTime,
  duration,
  isPause,
  volume,
  onTogglePause,
  onChangeType,
  onChangeTime,
  onVolumeChange,
  onToggleFull,
}: Props) {
  const { styles } = useStyle();
  // 当前视频的总时长 单位毫秒
  const max = useMemo(() => {
    return duration * 1000;
  }, [duration]);
  // 当前视频播放的进度 单位毫秒
  const currentTimeV = useMemo(() => {
    return currentTime * 1000;
  }, [currentTime]);
  // 格式化当前播放的时间文本
  const currentTimeText = useMemo(() => {
    return formatTime(currentTime);
  }, [currentTime]);
  // 格式化当前总时长文本
  const durationText = useMemo(() => {
    return formatTime(duration);
  }, [duration]);
  // 格式化当前的音量 0.1 - 10 / 1 - 100
  const volumeV = useMemo(() => {
    return Math.round(volume * 100);
  }, [volume]);
  // 动画库的api
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));
  // 当前选择的画质格式化文本
  const currentQuality = useMemo(() => {
    return formatQuality(activeType, rawI18n);
  }, [activeType]);
  // 用户点击拖动条的回调
  const handleTimeChange = (value: number) => {
    // value是毫秒，需要转换下
    onChangeTime(value / 1000);
  };
  // 用户拖动了音量条的回调
  const handleVolumeChange = (value: number) => {
    onVolumeChange(value / 100); // 需要格式化音量
  };
  // 用户鼠标移入的回调(解决点击播放和暂停动画显示问题)
  const hanldeMouseEnter = (e: MouseEvent) => {
    const { tagName } = e.target as HTMLElement;
    if (tagName && tagName.toLocaleLowerCase() === "div") {
      // 这里做了特殊处理，保证只有移入控制面板才会触发回调
      api.start({
        from: { opacity: 0 },
        to: { opacity: 1 },
      });
    }
  };
  // 用户鼠标移出的回调
  const handleMouseLeave = () => {
    api.start({
      from: { opacity: 1 },
      to: { opacity: 0 },
    });
  };
  // 用户点击播放或暂停视频
  const handleTogglePlay = () => {
    onTogglePause(!isPause);
  };
  // 用户切换画质的回调
  const handleChangeType = (value: VideoQuality | null) => {
    onChangeType(value);
  };
  // 缓存画质列表的react节点
  const qualityList = useMemo(() => {
    return sources.map(item => {
      return (
        <QualityItem
          activeType={activeType}
          key={item.url}
          item={item}
          rawI18n={rawI18n}
          onChange={handleChangeType}
        />
      );
    });
  }, [activeType]);
  return (
    <animated.div
      className={styles.panelRoot}
      style={{ ...springs }}
      onMouseEnter={hanldeMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTogglePlay}>
      <div
        className={styles.bottomBar}
        onClick={e => {
          e.stopPropagation(); // 停止事件冒泡
        }}>
        <SliderConfig>
          <Slider
            style={{ margin: "5px" }}
            max={max}
            value={currentTimeV}
            onChange={handleTimeChange}
            tooltip={{
              // 格式化tips的文本
              formatter(value) {
                if (value !== undefined) {
                  return formatTime(value / 1000);
                } else {
                  return formatTime(0);
                }
              },
            }}
          />
        </SliderConfig>
        <Flex
          justify="space-between"
          className={styles.barContent}>
          <Space align="center">
            <div
              className={styles.pauseIcon}
              onClick={handleTogglePlay}>
              <Icon>
                {isPause ? <PlayIcon /> : <PauseIcon className={styles.icon} />}
              </Icon>
            </div>
            <Space className={styles.timeText}>
              <div>{currentTimeText}</div>
              <div>/</div>
              <div>{durationText}</div>
            </Space>
          </Space>
          <Space
            align="center"
            size="large">
            <div className={styles.qualityBtn}>
              <div className={styles.qualityControllerContext}>
                <div className={styles.qualityController}>
                  <Space direction="vertical">{qualityList}</Space>
                </div>
              </div>
              <span>{currentQuality}</span>
            </div>
            <div className={styles.volumeBtn}>
              <div className={styles.volumeControllerContent}>
                <div className={styles.volumeController}>
                  <SliderConfig>
                    <span className={styles.volumeText}>{volumeV}</span>
                    <Slider
                      vertical
                      style={{ margin: "0" }}
                      max={VolumeValue.MAX}
                      tooltip={{ open: false }}
                      value={volumeV}
                      onChange={handleVolumeChange}
                    />
                  </SliderConfig>
                </div>
              </div>
              <VolumeIcon value={volumeV} />
            </div>
            <div
              className={styles.icon}
              onClick={onToggleFull}>
              <Icon>{isFull ? <FullMinIcon /> : <FullMaxIcon />}</Icon>
            </div>
          </Space>
        </Flex>
      </div>
    </animated.div>
  );
}
