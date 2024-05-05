import { Empty } from "antd";

import { NoMore, Skeleton, VideoItem } from "@/components";
import { useList } from "@/hooks";
import type { Video } from "@/types";

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
  const { list, loading, hasMore } = useList<Video>({ request, pageSize });

  return (
    <div>
      {list.length ? (
        <div className="grid grid-cols-2 gap-3 px-2 py-3 md:grid-cols-3 lg:grid-cols-4">
          {list.map(item => (
            <VideoItem
              key={item.video_id}
              video={item}
            />
          ))}
        </div>
      ) : (
        <Empty description="暂无数据" />
      )}
      {!loading && !hasMore && Boolean(list.length) && <NoMore />}
      {loading && <Skeleton.VideoList />}
    </div>
  );
}
