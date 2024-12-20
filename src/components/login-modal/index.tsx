import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import { Modal } from "antd";
import { useRef } from "react";

import { LoginForm } from "../";
import { LoginFormInst } from "../login-form";
import { useLoginModalStyles } from "./styles";

interface Props {
  /** 是否显示模态框 */
  show: boolean;
  /** 关闭模态框 */
  onClose: () => void;
}

export const LoginModal = ({ show, onClose }: Props) => {
  const { styles } = useLoginModalStyles();
  /** 表单实例 */
  const formInst = useRef<LoginFormInst | null>(null);
  /** 关闭模态框 */
  const handleCloseModal = () => {
    // 清空表单数据
    formInst.current && formInst.current.resetForm();
    // 关闭模态框
    onClose();
  };

  return (
    <Modal
      title={false}
      open={show}
      onCancel={handleCloseModal}
      footer={false}
      closeIcon={false}
      maskClosable={false}
      centered>
      <div className={styles.container}>
        <div
          className={styles.closeIconBox}
          onClick={handleCloseModal}>
          <CloseIcon />
        </div>
        <LoginForm
          onSubmit={handleCloseModal}
          ref={formInst}
        />
      </div>
    </Modal>
  );
};
