import { Button, Input, message } from "antd";
import { useState } from "react";

import { Avatar } from "@/components";
import { MittEvent } from "@/enums";
import { videoReplyControllerAddReply as postReply } from "@/servers/go_study_server/videoReply";
import { useUserStore } from "@/store";
import emitter from "@/utils/mitt";

interface Props {
  /** 评论id */
  cid: number;
  /** 发送回复成功的回调 */
  onSubmit: () => void;
}

// TODO 目前只能回复评论，不能回复回复
/** 发送回复 */
export function PostReply({ cid, onSubmit }: Props) {
  const { isLogin, userInfo } = useUserStore();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  /** 提交表单 */
  const handleSubmit = async () => {
    if (!isLogin()) {
      emitter.emit(MittEvent.OPEN_LOGIN_MODAL);
      return message.info("请先登录");
    }
    setLoading(true);
    try {
      await postReply({ comment_id: cid, content: value });
      setValue("");
      onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex pt-2 items-center">
        <Avatar
          src={userInfo?.avatar}
          antdProps={{ size: "small" }}
        />
        <div className="ml-3 flex-grow">
          <Input.TextArea
            placeholder="写下你的回复吧~"
            value={value}
            onChange={event => setValue(event?.target?.value || "")}
          />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button
          type="primary"
          htmlType="submit"
          disabled={!value}
          loading={loading}
          onClick={handleSubmit}>
          发布
        </Button>
      </div>
    </>
  );
}
