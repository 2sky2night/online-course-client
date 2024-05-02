import { UserOutlined as UserIcon } from "@ant-design/icons";
import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar } from "antd";

import { IS_ABSOLUTE_PATH, STATIC_SERVER_URL } from "@/constants";

interface Props {
  /** 头像 */
  src?: string | null;
  /** antd的头像配置 */
  antdProps?: AvatarProps;
}

export function Avatar({ src, antdProps }: Props) {
  if (src) {
    let _src = src;
    if (IS_ABSOLUTE_PATH.test(src)) {
      // 是站内的头像，需要拼接
      _src = `${STATIC_SERVER_URL}${src}`;
    }
    return (
      <AntdAvatar
        {...(antdProps || {})}
        src={_src}
      />
    );
  } else {
    return (
      <AntdAvatar
        {...(antdProps || {})}
        icon={<UserIcon />}
      />
    );
  }
}
