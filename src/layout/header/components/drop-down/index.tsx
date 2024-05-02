import type { MenuProps } from "antd";
import { Dropdown as AntdDropDown, Modal } from "antd";
import { cloneElement, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MittEvent, Page } from "@/enums";
import { useSettingStore, useUserStore } from "@/store";
import type { UserInfo } from "@/types";
import emitter from "@/utils/mitt";

import { dropDownRender } from "./config";
import { DropDownKey } from "./enums";
import { useDropDownStyles } from "./styles";
import { Avatar } from "@/components";

export function Dropdown() {
  const navigate = useNavigate();
  /** 切换主题 */
  const toggleTheme = useSettingStore(s => s.toggleTheme);
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
      toggleTheme();
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
    navigate(Page.INDEX); // 回到首页
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
                  <Avatar src={avatar} />
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
        <div>
          {/* TODO 这里必须用div包一下，不然会无法将下拉菜单渲染出来，而且这里有一个未知的报错 */}
          {isLogin && userInfo?.avatar ? (
            <Avatar
              antdProps={{ size: "large" }}
              src={userInfo.avatar}
            />
          ) : (
            <Avatar antdProps={{ size: "large" }} />
          )}
        </div>
      </AntdDropDown>
    </>
  );
}
