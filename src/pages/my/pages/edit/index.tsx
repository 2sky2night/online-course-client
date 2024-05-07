import { UploadOutlined as UploadIcon } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Radio } from "antd";
import { useRef, useState } from "react";

import { uploadImgControllerUploadUserAvatar as uploadAvatar } from "@/servers/go_study_server/uploadImg";
import { userControllerUpdateProfile as updateInfo } from "@/servers/go_study_server/user";
import { useUserStore } from "@/store";

interface FieldType {
  username: string;
  age: number | null;
  gender: null | boolean;
  avatar: string | null;
}

/** 编辑用户// TODO无表单验证 */
export default function EditUser() {
  // 表单域
  const [form] = Form.useForm<FieldType>();
  // 用户信息
  const { userInfo, updateUser } = useUserStore(state => ({
    updateUser: state.updateUser,
    userInfo: state.userInfo,
  }));
  // 文件域
  const inputDOMRef = useRef<HTMLInputElement | null>(null);
  // 加载态
  const [loading, setLoading] = useState(false);
  /** 提交表单 */
  const onFinish: FormProps<FieldType>["onFinish"] = async values => {
    const body: Record<string, number | string | boolean> = {
      user_name: values.username,
    };
    if (values.age) body.age = globalThis.Number(values.age);
    if (values.avatar) body.avatar = values.avatar;
    if (values.gender) body.gender = !!values.gender;
    setLoading(true);
    try {
      await updateInfo(body);
      updateUser({
        username: values.username,
        age: values.age,
        gender: values.gender,
        avatar: values.avatar,
      });
      message.success("编辑信息成功!");
    } finally {
      setLoading(false);
    }
  };
  /** 重置表单 */
  const onReset = () => form.resetFields();
  /** 点击选择图片 */
  const onChooseFile = () => inputDOMRef.current?.click();
  /** 选择了图片 */
  const onUploadFile = async () => {
    const { current: dom } = inputDOMRef;
    if (!dom) return message.warning("选择图片失败!");
    const [file] = dom.files || [];
    if (!file) return message.warning("未选择图片!");
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await uploadAvatar({} as any, file);
      if (data?.url) {
        // 上传成功，更新表单域
        form.setFieldValue("avatar", data.url);
        message.success("上传头像成功!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl my-5 md:text-3xl">✍️编辑信息</div>
      <Form<FieldType>
        initialValues={{
          // 根据用户数据初始化表单，在onFinish后会更新成最新的数据
          username: userInfo?.user_name || "",
          age: userInfo?.age || null,
          gender: userInfo?.gender !== null ? userInfo?.gender : null,
          avatar: userInfo?.avatar || null,
        }}
        form={form}
        onFinish={onFinish}>
        <Form.Item
          name="username"
          label={<span className="md:text-xl">用户名</span>}>
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="age"
          label={<span className="md:text-xl">年龄</span>}>
          <Input type="number"></Input>
        </Form.Item>
        <Form.Item
          name="gender"
          label={<span className="md:text-xl">性别</span>}>
          <Radio.Group>
            <Radio value={true}>男</Radio>
            <Radio value={false}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="avatar"
          label={<span className="md:text-xl">头像</span>}>
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={inputDOMRef}
              onChange={onUploadFile}
            />
            <Button
              icon={<UploadIcon />}
              loading={loading}
              onClick={onChooseFile}>
              点击上传
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end">
            <Button
              className="mr-3"
              onClick={onReset}>
              重置
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}>
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
