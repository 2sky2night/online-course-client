import { useMemo } from "react";

import { Avatar } from "@/components";
import { useIsMobile } from "@/hooks";
import type { Comment } from "@/types";
import { formatDate } from "@/utils/tools";

import { useCommentItemStyles } from "./styles";

interface Props {
  comment: Comment;
}

/** 评论项组件 性能这块有点炸裂，因为useIsMobile没有防抖 */
export function CommentItem({ comment }: Props) {
  const { styles } = useCommentItemStyles();
  const { isMobile } = useIsMobile();
  const createdTime = useMemo(() => {
    if (comment.created_time) {
      return formatDate(comment.created_time);
    } else {
      return "";
    }
  }, [comment.created_time]);

  return (
    <div className={styles.container}>
      <Avatar
        src={comment.user.avatar}
        antdProps={{ size: isMobile ? "default" : "large" }}
      />
      <div className={styles.content}>
        <div className={styles.comment}>
          <div className={styles.username}>{comment.user.user_name}</div>
          <div className={styles.textContent}>{comment.content}</div>
          <div className={styles.textSub}>
            <span>{createdTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
