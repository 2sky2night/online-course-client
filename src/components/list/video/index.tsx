import { useEffect, useRef, useState } from "react";

import { Skeleton, VideoItem } from "@/components";
import { MittEvent } from "@/enums";
import type { Video } from "@/types";
import emitter from "@/utils/mitt";

interface Props {
  pageSize?: number;
  /** 请求函数 */
  request: (
    offset: number,
    limit: number,
  ) => Promise<{ list: Video[]; hasMore: boolean }>;
}

/** 按需以列表的形式加载视频 */
export function VideoList({ request, pageSize = 20 }: Props) {
  /** 列表项 */
  const [list, setList] = useState<Video[]>([]);
  /** 加载态(页面展示加载态) */
  const [loading, setLoading] = useState(false);
  /** 页码 */
  const [page, setPage] = useState(1);
  /** 还有更多吗？ */
  const hasMoreRef = useRef(false);
  /** 加载态ref(js层面) */
  const loadingRef = useRef(false);
  /** 处理请求的回调 */
  const handleRequest = async () => {
    setLoading(true);
    loadingRef.current = true;
    try {
      const { list = [], hasMore = false } = await request(
        (page - 1) * pageSize,
        pageSize,
      );
      setList(state => [...state, ...list]);
      hasMoreRef.current = hasMore;
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };
  /** 触底的回调 */
  const handleScrollBottom = () => {
    // 在订阅消息时函数是旧的，在旧的函数作用域里面引用的旧的loading，所以只能必须用ref记录下loading的值
    if (loadingRef.current || !hasMoreRef.current) return;
    setPage(state => state + 1);
  };

  // 监听页码更新
  useEffect(() => {
    handleRequest();
  }, [page]);

  // 订阅触底的回调
  useEffect(() => {
    emitter.on(MittEvent.MAIN_IS_BOTTOM_DOWN, handleScrollBottom);
    return () => {
      emitter.off(MittEvent.MAIN_IS_BOTTOM_DOWN, handleScrollBottom);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 px-2 py-3 md:grid-cols-3 lg:grid-cols-4">
        {list.map(item => (
          <VideoItem
            key={item.video_id}
            video={item}
          />
        ))}
      </div>
      {loading && <Skeleton.VideoList />}
    </div>
  );
}
