import { message } from "antd";
import { useMemo, useRef, useState } from "react";

import { Avatar, ReplyPageList } from "@/components";
import { ReplyListInst } from "@/components/page-list/reply";
import { videoReplyControllerList as replyList } from "@/servers/go_study_server/videoReply";
import type { Comment } from "@/types";
import { formatDate } from "@/utils/tools";

import { PostReply } from "./components";
import { useCommentItemStyles } from "./styles";

interface Props {
  comment: Comment;
}

/** 评论项组件
 * 交互：
 * 1.点击评论项中回复，可以打开回复输入框，回复完成关闭输入框，重新加载回复列表
 * 2.若评论没有回复，在回复后，会出现展开按钮提示用户查看评论的回复
 * 3. 若评论有回复，会有展开按钮，查看所有评论，若评论没有回复，无展开按钮
 *  */
export function CommentItem({ comment }: Props) {
  const { styles } = useCommentItemStyles();
  // 是否展开回复
  const [expand, setExpand] = useState(false);
  // 是否在回复
  const [isReply, setIsReply] = useState(false);
  /** 回复列表实例 */
  const replyInstRef = useRef<ReplyListInst | null>(null);
  /** 回复数量(主要是控制查看回复按钮的展示) */
  const [count, setCount] = useState(comment.reply_count);
  /** 创建时间 */
  const createdTime = useMemo(() => {
    if (comment.created_time) {
      return formatDate(comment.created_time);
    } else {
      return "";
    }
  }, [comment.created_time]);
  /** 发送回复成功的回调 */
  const handleReply = () => {
    replyInstRef.current && replyInstRef.current.reset();
    message.success("发送回复成功!");
    setIsReply(false);
    setCount(state => state + 1);
  };

  return (
    <div className={styles.container}>
      <Avatar src={comment.user.avatar} />
      <div className={styles.content}>
        <div className={styles.comment}>
          <div className={styles.username}>{comment.user.user_name}</div>
          <div className={styles.textContent}>{comment.content}</div>
          <div className={styles.textSub}>
            <span className="mr-3">{createdTime}</span>
            <span
              className={styles.toReply}
              onClick={() => setIsReply(true)}>
              回复
            </span>
          </div>
        </div>
        <div>
          {!!count &&
            (expand ? (
              <ReplyPageList
                ref={replyInstRef}
                pageSize={5}
                request={(offset, limit) => {
                  return replyList({
                    cid: comment.comment_id,
                    offset,
                    limit,
                    desc: false,
                  }).then(res => {
                    return {
                      list: res?.data?.list || [],
                      total: res?.data?.total || 0,
                    };
                  });
                }}
              />
            ) : (
              <div className={styles.textSub}>
                <span>共 {count} 条回复，</span>
                <span
                  className={styles.queryReply}
                  onClick={() => setExpand(true)}>
                  点击查看
                </span>
              </div>
            ))}
          {isReply && (
            <PostReply
              cid={comment.comment_id}
              onSubmit={handleReply}
            />
          )}
        </div>
      </div>
    </div>
  );
}
