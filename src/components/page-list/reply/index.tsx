import type { PaginationProps } from "antd";
import { Pagination, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { ReplyItem } from "@/components";
import type { Reply } from "@/types";

import { useReplyPageListStyle } from "./styles";

interface Props {
  pageSize?: number;
  request: (
    offset: number,
    limit: number,
  ) => Promise<{ list: Reply[]; total: number }>;
}

export interface ReplyListInst {
  /** 重置页码重新加载数据 */
  reset: () => void;
}

/** 分页加载回复列表 */
export const ReplyPageList = forwardRef<ReplyListInst, Props>(
  ({ request, pageSize = 20 }, ref) => {
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<Reply[]>([]);
    const [page, setPage] = useState(1);
    const { styles } = useReplyPageListStyle();

    /** 处理请求 */
    const handleRequest = async () => {
      setLoading(true);
      try {
        const { list = [], total = 0 } = await request(
          (page - 1) * pageSize,
          pageSize,
        );
        setTotal(total);
        setList(list);
      } finally {
        setLoading(false);
      }
    };

    /** 更新页码 */
    const onChange: PaginationProps["onChange"] = page => {
      setPage(page);
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          reset() {
            setTotal(0);
            setList([]);
            setLoading(false);
            setPage(state => {
              if (state === 1) {
                // 因为依赖项没有发生变化，强制加载
                handleRequest();
              }
              return 1;
            });
          },
        };
      },
      [],
    );

    useEffect(() => {
      handleRequest();
    }, [page]);

    return (
      <div>
        {loading ? (
          <div className="flex py-3">
            <span className={styles.textSub}>正在加载...</span>
            <Spin className="ml-3" />
          </div>
        ) : (
          <>
            <div>
              {list.map(item => (
                <ReplyItem
                  key={item.reply_id}
                  reply={item}
                />
              ))}
            </div>
            <Pagination
              className="my-2"
              size="small"
              onChange={onChange}
              total={total}
              current={page}
              pageSize={pageSize}
              showTotal={total => (
                <span className={styles.textSub}>共 {total} 条回复</span>
              )}
            />
          </>
        )}
      </div>
    );
  },
);
