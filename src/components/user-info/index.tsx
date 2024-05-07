import { Space } from "antd";
import { useMemo } from "react";

import { Image } from "@/components";
import { UserInfo as UserInfoType } from "@/types";

import { useUserInfoStyles } from "./styles";

interface Props {
  user: UserInfoType;
  footer?: React.ReactNode;
}

export function UserInfo({ user, footer }: Props) {
  const { styles } = useUserInfoStyles();
  /** 性别 */
  const sex = useMemo(() => {
    if (user.gender === null) {
      return "未知";
    } else {
      return user.gender ? "男" : "女";
    }
  }, [user]);
  /** 年龄 */
  const age = useMemo(() => {
    if (user.age === null) {
      return "未知";
    } else {
      return user.age;
    }
  }, [user]);
  /** 注册天数 */
  const registerDay = useMemo(() => {
    return Math.floor(
      (new Date().getTime() - new Date(user.created_time).getTime()) / 86400000,
    );
  }, [user]);

  return (
    <>
      <div className="flex md:flex-row flex-col items-center p-3 md:items-start">
        <div className="m-3">
          <Image
            className={styles.userAvatar}
            src={user.avatar}
          />
        </div>
        <div className="p-0 md:p-4 flex-grow">
          <div className="text-2xl md:text-3xl mb-2 text-center md:text-left">
            {user.user_name}
          </div>
          <Space size="large">
            <div className={styles.dataItem}>
              <span>性别</span>
              <span>{sex}</span>
            </div>
            <div className={styles.dataItem}>
              <span>年龄</span>
              <span>{age}</span>
            </div>
            <div className={styles.dataItem}>
              <span>注册天数</span>
              <span>{registerDay} 天</span>
            </div>
          </Space>
        </div>
      </div>
      {footer && footer}
    </>
  );
}
