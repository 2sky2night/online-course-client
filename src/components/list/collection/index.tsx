import { Divider, Empty } from "antd";
import { useAntdToken } from "antd-style";
import { useEffect, useRef, useState } from "react";

import { CollectionItem, Skeleton } from "@/components";
import { MittEvent } from "@/enums";
import type { Collection } from "@/types";
import emitter from "@/utils/mitt";

interface Props {
  /** 请求函数 */
  request: (
    offset: number,
    limit: number,
  ) => Promise<{ list: Collection[]; hasMore: boolean }>;
  /** 页长度 */
  pageSize?: number;
}

export function CollectionList({ request, pageSize = 5 }: Props) {
  const [list, setList] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { colorTextDescription, fontSizeSM } = useAntdToken();
  const [page, setPage] = useState(1);
  const pageRef = useRef({
    hasMore: false,
    loading: false,
  });
  /** 处理请求 */
  const handleRequest = async () => {
    setLoading(true);
    pageRef.current.loading = true;
    try {
      const { list = [], hasMore = false } = await request(
        (page - 1) * pageSize,
        pageSize,
      );
      pageRef.current.hasMore = hasMore;
      setHasMore(hasMore);
      setList(state => [...state, ...list]);
    } finally {
      setLoading(false);
      pageRef.current.loading = false;
    }
  };
  /** 页面触底的回调 */
  const handleScrollBottom = () => {
    const { loading, hasMore } = pageRef.current;
    if (loading || !hasMore) return;
    setPage(state => state + 1);
  };

  useEffect(() => {
    handleRequest();
  }, [page]);

  useEffect(() => {
    emitter.on(MittEvent.MAIN_IS_BOTTOM_DOWN, handleScrollBottom);
    return () => {
      emitter.off(MittEvent.MAIN_IS_BOTTOM_DOWN, handleScrollBottom);
    };
  }, []);

  return (
    <div className="px-2 py-2">
      {list.length ? (
        list.map((item, index) => (
          <CollectionItem
            key={item.collection_id}
            collection={item}
            index={index + 1}
          />
        ))
      ) : (
        <Empty description="暂无数据" />
      )}
      {!hasMore && !loading && (
        <Divider style={{ color: colorTextDescription, fontSize: fontSizeSM }}>
          <span>没有更多了</span>
        </Divider>
      )}
      {loading && <Skeleton.Collection limit={5} />}
    </div>
  );
}
