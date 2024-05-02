import type { MenuProps } from "antd";
import {
  LoginOutlined as LoginIcon,
  LogoutOutlined as LogoutIcon,
  SunOutlined as LightIcon,
  // MoonOutlined as DrarkIcon,
} from "@ant-design/icons";
import { DropDownKey } from "./enums";

const baseItem: MenuProps["items"] = [
  {
    key: DropDownKey.THEME,
    label: "主题切换",
    icon: <LightIcon />,
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
