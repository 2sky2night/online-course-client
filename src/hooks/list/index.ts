import { useEffect, useRef, useState } from "react";

import { MittEvent } from "@/enums";
import emitter from "@/utils/mitt";

interface Hooks<T> {
  /** 请求函数 */
  request: (
    offset: number,
    limit: number,
  ) => Promise<{ list: T[]; hasMore: boolean }>;
  /** 页长度 */
  pageSize?: number;
}

/**
 * 滚动加载更多的列表hooks
 * 1.状态管理
 * 2.触底加载更多
 */
export function useList<T>({ request, pageSize = 20 }: Hooks<T>) {
  // 列表
  const [list, setList] = useState<T[]>([]);
  // 加载态
  const [loading, setLoading] = useState(false);
  // 页码
  const [page, setPage] = useState(1);
  // 还有更多吗
  const [hasMore, setHasMore] = useState(false);
  // 存储的同步数据
  const syncRef = useRef({
    loading,
    hasMore,
  });
  /** 处理请求 */
  const handleRequest = async () => {
    setLoading(true);
    syncRef.current.loading = true;
    try {
      const { list, hasMore } = await request((page - 1) * pageSize, pageSize);
      setHasMore(hasMore);
      syncRef.current.hasMore = hasMore;
      setList(state => [...state, ...list]);
    } finally {
      setLoading(false);
      syncRef.current.loading = false;
    }
  };
  /** 触底的回调 */
  const handleSrcollBottom = () => {
    const { loading, hasMore } = syncRef.current;
    if (loading || !hasMore) return;
    setPage(state => state + 1);
  };
  /** 重置列表 */
  const handleReset = () => {
    setList([]);
    setPage(page => {
      if (page === 1) {
        // 若页码本来就是1重置为1时依赖项没有变化，这里强制请求下
        handleRequest();
      }
      return 1;
    });
    setHasMore(false);
    setLoading(false);
    syncRef.current.hasMore = false;
    syncRef.current.loading = false;
  };
  // 绑定触底的消息订阅
  useEffect(() => {
    emitter.on(MittEvent.MAIN_IS_BOTTOM_DOWN, handleSrcollBottom);
    return () => {
      emitter.off(MittEvent.MAIN_IS_BOTTOM_DOWN, handleSrcollBottom);
    };
  }, []);
  // 页码更新加载最新数据
  useEffect(() => {
    handleRequest();
  }, [page]);

  return {
    /** model */
    list,
    /** 正在加载 */
    loading,
    /** 还有更多吗 */
    hasMore,
    /** 同步数据 */
    syncRef,
    /** 页码 */
    page,
    /** 页长度 */
    pageSize,
    /** 重置列表 */
    handleReset,
  };
}
