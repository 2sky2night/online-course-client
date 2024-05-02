import {
  LoginOutlined as LoginIcon,
  LogoutOutlined as LogoutIcon,
  MoonOutlined as DrarkIcon,
  SunOutlined as LightIcon,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

import { useSettingStore } from "@/store";

import { DropDownKey } from "./enums";

const ThemeIcon = () => {
  const isDark = useSettingStore(s => s.isDark);
  return <span className="mr-2">{isDark ? <LightIcon /> : <DrarkIcon />}</span>;
};

const ThemeText = () => {
  const isDark = useSettingStore(s => s.isDark);
  return <span>{isDark ? "亮色主题" : "暗色主题"}</span>;
};

const baseItem: MenuProps["items"] = [
  {
    key: DropDownKey.THEME,
    label: <ThemeText />,
    icon: <ThemeIcon />,
  },
];

export const dropDownRender = (isLogin: boolean): MenuProps["items"] => {
  return isLogin
    ? [
        ...baseItem,
        {
          key: DropDownKey.LOGOOUT,
          label: "登出",
          icon: <LogoutIcon />,
        },
      ]
    : [
        ...baseItem,
        {
          key: DropDownKey.LOGIN,
          label: "登录",
          icon: <LoginIcon />,
        },
      ];
};
