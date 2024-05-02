import {
  LoginOutlined as LoginIcon,
  LogoutOutlined as LogoutIcon,
  SunOutlined as LightIcon,
  MoonOutlined as DrarkIcon,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

import { DropDownKey } from "./enums";
import { useSettingStore } from "@/store";

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
