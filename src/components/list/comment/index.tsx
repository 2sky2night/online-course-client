import { Empty } from "antd";
import { forwardRef, useImperativeHandle } from "react";

import { CommentItem, NoMore, Skeleton } from "@/components";
import { useList } from "@/hooks";
import type { Comment } from "@/types";

interface Props {
  /** 请求函数 */
  request: (
    offset: number,
    limit: number,
  ) => Promise<{ list: Comment[]; hasMore: boolean }>;
  /** 页长度 */
  pageSize?: number;
}

export interface CommentListInst {
  /** 重置列表 */
  reset: () => void;
}

/** 评论列表组件 */
export const CommentList = forwardRef<CommentListInst, Props>(
  ({ request, pageSize }, ref) => {
    const { loading, hasMore, list, handleReset } = useList({
      request,
      pageSize,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          reset: handleReset,
        };
      },
      [],
    );

    return (
      <div>
        <div>
          {list.map(item => (
            <CommentItem
              key={item.comment_id}
              comment={item}
            />
          ))}
        </div>
        {!loading && !list.length && <Empty description="暂无数据" />}
        {loading && <Skeleton.Comment limit={5} />}
        {!loading && !hasMore && !!list.length && <NoMore />}
      </div>
    );
  },
);
