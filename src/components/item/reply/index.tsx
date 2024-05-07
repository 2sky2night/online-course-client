import { useMemo } from "react";

import { Avatar } from "@/components";
import type { Reply } from "@/types";
import { formatDate } from "@/utils/tools";

import { useReplyItemStyle } from "./styles";

interface Props {
  reply: Reply;
}

/** 回复项组件，
 * // TODO 并不能展示回复了谁，需要后端支持
 * // TODO 无回复回复功能
 *  */
export function ReplyItem({ reply }: Props) {
  const { styles } = useReplyItemStyle();
  /** 创建时间 */
  const createdTime = useMemo(() => {
    if (reply.created_time) {
      return formatDate(reply.created_time);
    } else {
      return "";
    }
  }, [reply.created_time]);

  return (
    <div className="flex py-3">
      <Avatar
        src={reply.user.avatar}
        antdProps={{ size: "small" }}
      />
      <div className="py-1 flex-grow ml-2">
        <div>{reply.user.user_name}</div>
        <div className="py-3">{reply.content}</div>
        <div className={styles.textSub}>
          <span>{createdTime}</span>
        </div>
      </div>
    </div>
  );
}
