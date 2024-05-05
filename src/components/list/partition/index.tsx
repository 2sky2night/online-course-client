import { Empty } from "antd";

import { NoMore, PartitionItem, Skeleton } from "@/components";
import { useList } from "@/hooks";
import type { Partition } from "@/types";

interface Props {
  /** 请求函数 */
  request: (
    offset: number,
    limit: number,
  ) => Promise<{ list: Partition[]; hasMore: boolean }>;
  /** 页长度 */
  pageSize?: number;
}

export function PartitionList({ request, pageSize = 20 }: Props) {
  const { list, loading, hasMore } = useList({ request, pageSize });
  loading;
  hasMore;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-2">
        {list.map(item => (
          <PartitionItem
            key={item.partition_id}
            partition={item}
          />
        ))}
      </div>
      {!loading && !list.length && <Empty description="暂无数据" />}
      {loading && <Skeleton.Partition limit={4} />}
      {!loading && !hasMore && !!list.length && <NoMore />}
    </div>
  );
}
