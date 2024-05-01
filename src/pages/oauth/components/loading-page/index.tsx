import React from "react";
import { useLoadingPageStyles } from "./styles";
import { LoadingOutlined as LoadingIcon } from "@ant-design/icons";

interface Props {
  /** 平台名称 */
  platform: string;
  /** 图表 */
  PlatformIcon: React.FC;
}

export function LoadingPage({ platform, PlatformIcon }: Props) {
  const { styles } = useLoadingPageStyles();
  return (
    <div className={styles.container}>
      <div className="mb-6">
        <PlatformIcon />
      </div>
      <div className="text-2xl mb-3">
        <span className="mr-2">{platform}</span>
        <span>OAuth 授权登录</span>
      </div>
      <div className="text-xl">
        <span className="mr-2">正在登录中...</span>
        <LoadingIcon
          spin
          className={styles.loadingIcon}
        />
      </div>
    </div>
  );
}
