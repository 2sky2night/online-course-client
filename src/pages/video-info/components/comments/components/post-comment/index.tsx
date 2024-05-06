import { Button, Input, message } from "antd";
import { useState } from "react";

import { Avatar } from "@/components";
import { MittEvent } from "@/enums";
import { videoCommentControllerAddComment as postComment } from "@/servers/go_study_server/videoComment";
import { useUserStore } from "@/store";
import emitter from "@/utils/mitt";

interface Props {
  /** 视频id */
  vid: number;
  /** 评论发送成功的回调 */
  onSubmit: () => void;
}

export function PostComment({ vid, onSubmit }: Props) {
  // 用户信息
  const { userInfo, isLogin } = useUserStore();
  // 评论内容
  const [value, setValue] = useState("");
  // 加载态
  const [loading, setLoading] = useState(false);
  /** 发送评论 */
  const handleSubmit = async () => {
    if (!isLogin()) {
      emitter.emit(MittEvent.OPEN_LOGIN_MODAL);
      return message.info("请先登录");
    }
    setLoading(true);
    try {
      await postComment({ content: value, video_id: vid });
      setValue(""); // 清空表单内容
      message.success("发送评论成功!");
      onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2">
      <div className="py-3 flex items-center">
        <Avatar
          src={userInfo?.avatar}
          antdProps={{ size: "large" }}
        />
        <Input.TextArea
          className="ml-2"
          placeholder="写下你的评论吧~"
          value={value}
          onInput={event => {
            setValue((event.target as HTMLInputElement)?.value || "");
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button
          htmlType="submit"
          type="primary"
          disabled={!value}
          loading={loading}
          onClick={handleSubmit}>
          发布
        </Button>
      </div>
    </div>
  );
}
