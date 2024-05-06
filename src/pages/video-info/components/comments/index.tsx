import { useRef } from "react";

import { CommentList } from "@/components";
import type { CommentListInst } from "@/components/list/comment";
import { videoCommentControllerList as commentList } from "@/servers/go_study_server/videoComment";
import type { VideoInfo } from "@/types";

import { PostComment } from "./components";
import { useCommentsStyles } from "./styles";

interface Props {
  /** 视频的基本信息 */
  video: VideoInfo;
  /** 发布了视频评论 */
  onPostComment: () => void;
}

export function VideoComments({ video, onPostComment }: Props) {
  const { styles } = useCommentsStyles();
  const commentInstRef = useRef<CommentListInst | null>(null);
  /** 发送评论成功的回调 */
  const handleSubmit = () => {
    commentInstRef.current && commentInstRef.current.reset();
    onPostComment();
  };

  return (
    <div>
      <div>
        <div className={styles.commentTitle}>
          <span className="text-xl mr-3 md:text-3xl">评论</span>
          <span className={styles.textSub}>{video.count.comments}</span>
        </div>
        <PostComment
          vid={video.video_id}
          onSubmit={handleSubmit}
        />
      </div>
      <CommentList
        ref={commentInstRef}
        pageSize={20}
        request={(offset, limit) => {
          return commentList({
            offset,
            limit,
            desc: false,
            vid: video.video_id,
          }).then(res => {
            return {
              list: res?.data?.list || [],
              hasMore: res?.data?.has_more || false,
            };
          });
        }}
      />
    </div>
  );
}
