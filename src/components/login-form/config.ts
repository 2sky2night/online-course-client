import type { Rule } from "antd/es/form";

export const emailRule: Rule[] = [
  {
    required: true,
    message: "请输入邮箱",
  },
  {
    pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/, // eslint-disable-line
    message: "错误的邮箱格式",
  },
];

export const codeRule: Rule[] = [
  {
    required: true,
    message: "请输入邮箱验证码",
  },
  {
    pattern: /^\d{4}$/,
    message: "错误的邮箱验证码格式",
  },
];
