import { Empty } from "antd";

import { CollectionItem, NoMore, Skeleton } from "@/components";
import { useList } from "@/hooks";
import type { Collection } from "@/types";

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
  const { list, loading, hasMore } = useList({ request, pageSize });

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
      {!loading && !hasMore && Boolean(list.length) && <NoMore />}
      {loading && <Skeleton.Collection limit={5} />}
    </div>
  );
}
