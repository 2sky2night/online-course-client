import { Button, Divider, Flex, Form, FormInstance, Space } from "antd";
import { GithubFilled as GithubIcon } from "@ant-design/icons";
import { useLoginFormStyles } from "./styles";
import { Captcha } from "../";
import { useRef, useState } from "react";
import { codeRule, emailRule } from "./config";
import {
  authUserControllerGenerateCode as getCode,
  authUserControllerEmailLogin as loginByCode,
} from "@/servers/go_study_server/authUser";
import { OAuthUrl } from "@/constants";
import { useUserStore } from "@/store";

interface Props {
  /** 登录成功的回调 */
  onSubmit: () => void;
}

export function LoginForm({ onSubmit }: Props) {
  const { styles } = useLoginFormStyles();
  /** 用户仓库 */
  const userState = useUserStore();
  /** 加载中 */
  const [loading, setLoading] = useState(false);
  /** antd表单实例 */
  const formRef = useRef<FormInstance | null>(null);
  /** 表单数据 */
  const [formData, setFormData] = useState({
    email: "", // TODO 解决这里莫名其妙的绑定错误
    code: "",
  });
  /** 获取验证码 */
  const handleCaptch = () => {
    getCode({ email: formData.email });
  };
  /** 校验邮箱验证码 */
  const handleCaptchV = () => {
    const formInst = formRef.current;
    if (!formInst) return Promise.reject();
    return formInst.validateFields(["email"]);
  };
  /** 邮箱验证码登录 */
  const handleCodeLogin = async () => {
    const formInst = formRef.current;
    if (!formInst) return;
    await formInst.validateFields();
    setLoading(true);
    const { email, code } = formData;
    try {
      const res = await loginByCode({ email, code });
      userState.login(res?.data?.access_token || "");
      onSubmit();
    } finally {
      setLoading(false);
    }
  };
  /** 表单域更新 */
  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = event => {
    if (event.target) {
      const { dataset, value } = event.target;
      const field = dataset.field || "";
      if (field === "code") setFormData({ ...formData, code: value });
      else if (field === "email") setFormData({ ...formData, email: value });
    }
  };
  return (
    <div>
      <div className={styles.title}>验证码登录</div>
      <Form<typeof formData>
        requiredMark={false}
        ref={formRef}>
        <Form.Item
          name="email"
          rules={emailRule}>
          <input
            className={styles.inputEmail}
            placeholder="邮箱"
            data-field="email"
            value={formData.email}
            onChange={handleChange}></input>
        </Form.Item>
        <Form.Item
          name="code"
          rules={codeRule}>
          <div className={styles.inputCodeBox}>
            <input
              placeholder="输入 4 位邮箱验证码"
              className={styles.inputCode}
              data-field="code"
              value={formData.code}
              onChange={handleChange}></input>
            <Captcha
              text="获取邮箱验证码"
              time={60}
              DisableText={({ time }) => {
                return <span>{time} 秒后重新获取</span>;
              }}
              onValidate={handleCaptchV}
              onSubmit={handleCaptch}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            size="large"
            type="primary"
            loading={loading}
            onClick={handleCodeLogin}>
            登录/注册
          </Button>
        </Form.Item>
      </Form>
      <Divider>
        <span className={styles.dividerText}>其他方式登录</span>
      </Divider>
      <Flex justify="center">
        <Space size="large">
          <GithubIcon
            className={styles.icon}
            onClick={() => (globalThis.location.href = OAuthUrl.github)}
          />
          <img
            className={styles.imgIcon}
            src="/images/alipay.svg"
            onClick={() => (globalThis.location.href = OAuthUrl.alipay)}></img>
          <img
            className={styles.imgIcon}
            src="/images/gitee.svg"
            onClick={() => (globalThis.location.href = OAuthUrl.gitee)}></img>
        </Space>
      </Flex>
    </div>
  );
}
