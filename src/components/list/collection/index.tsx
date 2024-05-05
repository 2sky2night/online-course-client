import { Divider, Empty } from "antd";
import { useAntdToken } from "antd-style";

import { CollectionItem, Skeleton } from "@/components";
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
  const { colorTextDescription, fontSizeSM } = useAntdToken();
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
      {!hasMore && !loading && (
        <Divider style={{ color: colorTextDescription, fontSize: fontSizeSM }}>
          <span>没有更多了</span>
        </Divider>
      )}
      {loading && <Skeleton.Collection limit={5} />}
    </div>
  );
}
