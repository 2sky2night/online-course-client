import {
  LikeFilled as LikedIcon,
  LikeOutlined as LikeIcon,
} from "@ant-design/icons";
import { Icon } from "@ricons/utils";
import { message } from "antd";
import { useAntdToken } from "antd-style";
import { useEffect, useMemo, useRef, useState } from "react";

import { MittEvent } from "@/enums";
import {
  videoControllerAddLike as likeVideo,
  videoControllerGetVideoStatus as getVideoLikeStatus,
  videoControllerRemoveLike as cancelLikeVideo,
} from "@/servers/go_study_server/video";
import { useUserStore } from "@/store";
import emitter from "@/utils/mitt";

interface BastBtnProps {
  /** 默认值 */
  defaultValue?: boolean;
  /** 初始化的请求函数 */
  initRequest?: () => Promise<boolean>;
  /** 请求函数 */
  request: (value: boolean) => Promise<void>;
  /** 点赞数量 */
  count: number;
}

/**
 * 点赞按钮，支持：
 * 1.初始化获取状态
 * 2.初始值
 * 3.点击事件触发时的请求函数
 * 4.状态管理
 */
function BaseBtn({
  initRequest,
  request,
  defaultValue = false,
  count,
}: BastBtnProps) {
  const isLogin = useUserStore(s => s.isLogin);
  const [value, setValue] = useState(defaultValue);
  const { colorText, colorPrimary } = useAntdToken();
  const syncRef = useRef({
    loading: false,
    defaultValue,
  });
  // 动态计算点赞数量
  const likeCount = useMemo(() => {
    let _count = count;
    if (syncRef.current.defaultValue) {
      // 当前点过赞了
      if (value) return _count;
      _count = _count - 1;
    } else {
      // 当前未点过赞
      if (!value) return _count;
      _count = _count + 1;
    }
    return _count >= 0 ? _count : 0;
  }, [value]);

  const handleRequest = async () => {
    if (!isLogin()) {
      emitter.emit(MittEvent.OPEN_LOGIN_MODAL);
      return message.info("请先登录");
    }
    if (syncRef.current.loading) return;
    syncRef.current.loading = true;
    try {
      await request(value);
      setValue(state => !state);
    } finally {
      syncRef.current.loading = false;
    }
  };

  useEffect(() => {
    if (initRequest) {
      // 获取初始值
      syncRef.current.loading = true;
      initRequest().then(
        v => {
          setValue(v);
          syncRef.current.loading = false;
          syncRef.current.defaultValue = v;
        },
        () => (syncRef.current.loading = false),
      );
    }
  }, []);

  return (
    <span
      className="text-2xl inline-flex items-center"
      onClick={handleRequest}
      style={{ color: value ? colorPrimary : colorText }}>
      <div className="cursor-pointer">
        <Icon>{value ? <LikedIcon /> : <LikeIcon />}</Icon>
      </div>
      <span className="ml-2 text-lg">{likeCount}</span>
    </span>
  );
}

/** 点赞视频按钮 */
function Video({ vid, count }: { vid: number; count: number }) {
  const isLogin = useUserStore(s => s.isLogin);
  return (
    <BaseBtn
      count={count}
      request={value => {
        if (value) {
          return cancelLikeVideo({ vid }).then(() => {});
        } else {
          return likeVideo({ vid }).then(() => {});
        }
      }}
      initRequest={() => {
        if (isLogin()) {
          return getVideoLikeStatus({ vid }).then(r => {
            return r?.data?.is_like || false;
          });
        } else {
          return Promise.resolve(false);
        }
      }}
    />
  );
}

export default {
  Video,
};
