import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

interface Props {
  /** 正常时显示的文案 */
  text: string;
  /** 不可用时显示的文案 */
  DisableText: React.FC<{ time: number }>;
  /** 验证码时长 */
  time: number;
  /** 获取验证码 */
  onSubmit: () => void;
  /** 获取验证码的前置 */
  onValidate: () => Promise<void>;
}

export function Captcha({
  text,
  DisableText,
  time: delayTime,
  onSubmit,
  onValidate,
}: Props) {
  // 是否开始倒计时
  const [isDisable, setIsDisable] = useState(false);
  // 计时器id
  const timer = useRef<number | null>(null);
  // 倒计时
  const [time, setTime] = useState(delayTime);
  /** 开始计时 */
  const handleStart = () => {
    onValidate().then(() => {
      setIsDisable(true);
      onSubmit();
      timer.current = globalThis.setInterval(() => setTime(s => s - 1), 1000);
    });
  };
  /** 清除计时器 */
  const clearTimer = () => {
    const id = timer.current;
    if (id !== null) {
      setIsDisable(false);
      globalThis.clearInterval(id);
      timer.current = null;
    }
  };
  // 监听计时器
  useEffect(() => {
    if (time <= 0) {
      setTime(delayTime);
      clearTimer();
    }
  }, [time]);
  useEffect(() => {
    return clearTimer;
  }, []);
  return (
    <Button
      type="primary"
      disabled={isDisable}
      onClick={handleStart}>
      {isDisable ? <DisableText time={time} /> : <span>{text}</span>}
    </Button>
  );
}
