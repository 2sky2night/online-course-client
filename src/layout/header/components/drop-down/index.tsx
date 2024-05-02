import { useUserStore } from "@/store";
import { Avatar, Dropdown as AntdDropDown, Modal } from "antd";
import { useMemo, cloneElement, useState } from "react";
import { dropDownRender } from "./config";
import type { UserInfo } from "@/types";
import type { MenuProps } from "antd";
import { useDropDownStyles } from "./styles";
import { DropDownKey } from "./enums";
import emitter from "@/utils/mitt";
import { MittEvent, Page } from "@/enums";
import { useNavigate } from "react-router-dom";

export function Dropdown() {
  const navigate = useNavigate();
  const { isLogin: getIsLogin, userInfo, logout } = useUserStore();
  const { styles } = useDropDownStyles();
  // 是否展示退出模态框
  const [showModal, setShowModal] = useState(false);
  /** 是否登录 */
  const isLogin = useMemo(() => {
    return !!(getIsLogin() && userInfo);
  }, [userInfo, getIsLogin()]);
  /** 渲染下拉列表项 */
  const items = useMemo(() => {
    return dropDownRender(isLogin);
  }, [isLogin]);
  /** 点击某个菜单项的回调映射 */
  const handlerMap = {
    [DropDownKey.THEME]: () => {
      // TODO 主题切换
      console.log("主题切换");
    },
    [DropDownKey.LOGIN]: () => {
      // 打开模态框
      emitter.emit(MittEvent.OPEN_LOGIN_MODAL);
    },
    [DropDownKey.LOGOOUT]: () => setShowModal(true),
  };
  /** 确认登出的回调 */
  const handleConfrimLogout = () => {
    // TODO 页面是刷新？还是回到首页？还是暂留在当前页面？
    logout();
    setShowModal(false);
    navigate(Page.Index); // 回到首页
  };
  /** 点击某一项菜单的回调 */
  const handleSelect: MenuProps["onClick"] = ({ key }) => {
    const handler = Reflect.get(handlerMap, key);
    handler && handler();
  };
  return (
    <>
      <Modal
        open={showModal}
        title="提示"
        cancelText="取消"
        okText="确认"
        okType="danger"
        onCancel={() => setShowModal(false)}
        onOk={handleConfrimLogout}>
        <span>确认登出账号 ?</span>
      </Modal>
      <AntdDropDown
        arrow={{
          pointAtCenter: true,
        }}
        menu={{
          items,
          onClick: handleSelect,
        }}
        dropdownRender={menu => {
          if (isLogin) {
            const { user_name = "", avatar = "" } = userInfo as UserInfo;
            return (
              <div className={styles.content}>
                <div
                  className={styles.userBox}
                  onClick={e => e.stopPropagation()}>
                  {avatar ? <Avatar src={avatar} /> : <Avatar>我</Avatar>}
                  <div className={styles.userName}>{user_name}</div>
                </div>
                {cloneElement(menu as React.ReactElement, {
                  style: {
                    boxShadow: "none",
                  },
                })}
              </div>
            );
          } else {
            return menu;
          }
        }}>
        {isLogin && userInfo?.avatar ? (
          <Avatar
            size="large"
            src={userInfo.avatar}
          />
        ) : (
          <Avatar size="large">我</Avatar>
        )}
      </AntdDropDown>
    </>
  );
}
