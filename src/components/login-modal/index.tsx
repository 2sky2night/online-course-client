import { Modal } from "antd";
import { LoginForm } from "../";
import { useLoginModalStyles } from "./styles";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";

interface Props {
  /** 是否显示模态框 */
  show: boolean;
  /** 关闭模态框 */
  onClose: () => void;
}

export const LoginModal = ({ show, onClose }: Props) => {
  const { styles } = useLoginModalStyles();
  /** 登录成功的回调 */
  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal
      title={false}
      open={show}
      onCancel={onClose}
      footer={false}
      closeIcon={false}
      maskClosable={false}>
      <div className={styles.container}>
        <div
          className={styles.closeIconBox}
          onClick={onClose}>
          <CloseIcon />
        </div>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </Modal>
  );
};
