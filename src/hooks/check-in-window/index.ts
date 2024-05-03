import { useEffect, useRef } from "react";

/**
 * 检测某个元素是否进入视口了，只要发生交集了，就触发回调并销毁监听
 * @param handler 相交的回调
 */
export function useCheckInWindow(handler: () => void) {
  const domRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  /** 每次交集发生变化的回调 */
  const handleIntersection: IntersectionObserverCallback = ([e]) => {
    if (e.isIntersecting) {
      handler();
      disconnect();
    }
  };
  /** 初始化和绑定交集监听 */
  const binder = (dom: HTMLElement) => {
    observerRef.current = new globalThis.IntersectionObserver(
      handleIntersection,
    );
    domRef.current = dom;
    observerRef.current.observe(domRef.current);
  };
  /** 销毁监听 */
  const disconnect = () => {
    domRef.current && observerRef.current?.unobserve(domRef.current);
    domRef.current = null;
    observerRef.current?.disconnect();
    observerRef.current = null;
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    /** 绑定dom并开启监听 */
    binder,
  };
}
