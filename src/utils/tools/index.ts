import { Dayjs } from "@/utils/dayjs";

/**
 * 格式化时间文本
 * 规则:
 * 1.今年的显示MM-DD
 * 2.7天内的显示x天前
 * 3.其他：YY-MM-DD
 * 4.今天的:1.x小时前 2.x分钟前 3.x秒前
 * @param datatime
 */
export function formatDate(datatime: string) {
  const time = Dayjs(datatime);
  const nowTime = Dayjs();
  if (time.year() === nowTime.year()) {
    // 今年的
    if (time.month() === nowTime.month()) {
      // 本月的
      const day = Math.abs(time.date() - nowTime.date());
      if (day <= 7) {
        // 7天内的
        if (time.date() === nowTime.date()) {
          // 今天的
          const min = nowTime.diff(time) / 1000;
          if (min >= 3600) {
            return `${Math.floor(min / 3600)} 小时前`;
          } else if (min >= 60) {
            return `${Math.floor(min / 60)} 分钟前`;
          } else {
            return `${min} 小时前`;
          }
        } else {
          // 非今天的返回x天前
          return `${day} 天前`;
        }
      } else {
        // 7天外的
        return time.format("MM-DD");
      }
    } else {
      // 非本月的
      return time.format("MM-DD");
    }
  } else {
    // 非今年的
    return time.format("YYYY-MM-DD");
  }
}

/**
 * 格式化时长
 * 规则：
 * 1.大于等于60分钟展示HH:MM:SS
 * 2.否则MM:SS
 * @param duration 时长（秒）
 */
export function formatDuration(duration: number) {
  let time = Math.floor(duration);
  if (time >= 3600) {
    const hour = Math.floor(time / 3600);
    time = time % 3600;
    const min = Math.floor(time / 60);
    const sed = time % 60;
    return `${formatNum(hour)}:${formatNum(min)}:${formatNum(sed)}`;
  } else {
    const min = Math.floor(time / 60);
    const sed = time % 60;
    return `${formatNum(min)}:${formatNum(sed)}`;
  }
}

/**
 * 格式化数字文本，值小于多少位就补全多少个0
 * @param value 值
 * @param pre 一共多少位
 * @returns
 */
export function formatNum(value: number, pre = 2) {
  const preValue = 10 ^ (pre - 1);
  if (value < preValue) {
    return Array.from({ length: pre - String(value).length })
      .fill("0")
      .concat(String(value).split(""))
      .join("");
  } else {
    return String(value);
  }
}

/**
 * 解析数值字符串
 * @param value
 */
export function validateNumStr(value: string) {
  const _value = +value;
  if (globalThis.Number.isNaN(_value)) {
    return null;
  } else {
    return _value;
  }
}

/**
 * 格式化时间文本 如 00:10 hh：ss
 * @param value 单位 秒
 */
export function formatTime(value: number) {
  const sed = Math.floor(value % 60);
  const min = Math.floor(value / 60);
  return `${formatNum(min)}:${formatNum(sed)}`;
}
